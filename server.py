import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.autoreload
from util.task import sched, host_scheduler, check_scheduler

from application import settings
from url import url
from tornado.options import define, options

import os
from dotenv import load_dotenv
import logging
from termcolor import colored

load_dotenv()
log_level = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=getattr(logging, log_level),
    format="%(asctime)s-%(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

define("port", default=80, help="run on the given port", type=int)
define("address", default="127.0.0.1", help="bind to the given address", type=str)


def start_server():
    """启动 Tornado 服务器"""
    try:
        check_scheduler()
        tornado.options.parse_command_line()
        app = tornado.web.Application(handlers=url, **settings)
        http_server = tornado.httpserver.HTTPServer(app)
        http_server.listen(options.port, address=options.address)
        logger.info(
            colored(
                f"Development server is running at http://{options.address}:{options.port}/",
                "green",
            )
        )
        tornado.ioloop.IOLoop.current().start()
    except Exception as e:
        logger.error(colored(f"Failed to start server: {e}", "red"))
        raise


if __name__ == "__main__":
    start_server()
