#!/usr/bin/env python
# -*- coding:utf-8 -*-
from apscheduler.schedulers.background import BackgroundScheduler
from service.hostservice import hostonline
import atexit
import platform

sched = BackgroundScheduler()


# 根据平台选择锁机制
if platform.system() != "Windows":
    import fcntl
else:
    import msvcrt

# 初始化调度器
sched = BackgroundScheduler()


def check_scheduler():
    lock_file = "scheduler.lock"

    # 使用 with 语句管理文件资源
    with open(lock_file, "wb") as f:
        if platform.system() != "Windows":
            # Linux/macOS 使用 fcntl
            try:
                fcntl.flock(f, fcntl.LOCK_EX | fcntl.LOCK_NB)
                sched.start()  # 启动调度器
                if sched.get_job("check_host"):
                    print("Scheduler already has 'check_host' job.")
                else:
                    host_scheduler()
            except BlockingIOError:
                print("Another instance is already running.")
        else:
            # Windows 使用 msvcrt
            try:
                msvcrt.locking(f.fileno(), msvcrt.LK_NBLCK, 1)
                sched.start()  # 启动调度器
                if sched.get_job("check_host"):
                    print("Scheduler already has 'check_host' job.")
                else:
                    host_scheduler()
            except IOError:
                print("Another instance is already running.")

        # 定义解锁函数
        def unlock():
            if platform.system() != "Windows":
                fcntl.flock(f, fcntl.LOCK_UN)
            else:
                msvcrt.locking(f.fileno(), msvcrt.LK_UNLCK, 1)
            # 文件已在 with 语句中关闭，无需手动 f.close()

        atexit.register(unlock)


def host_scheduler():
    sched.add_job(hostonline, "interval", seconds=30, id="check_host")
    print("It is \033[1;35m running \033[0m!")
    return True


if __name__ == "__main__":
    check_scheduler()
