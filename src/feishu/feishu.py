import sys

import requests

# JOB_URL = sys.argv[1]
url = 'https://open.feishu.cn/open-apis/bot/v2/hook/1ce66387-7ef1-44e0-965e-5c01ad46d6f8'
method = 'post'
headers = {
    'Content-Type': 'application/json'
}
json = {
    "msg_type": "interactive",
    "card": {
        "config": {
            "wide_screen_mode": True,
            "enable_forward": True
        },
        "elements": [{
            "tag": "div",
            "text": {
                "content": "接口自动化测试完成，可以继续后续验证。",
                "tag": "lark_md"
            }
        },
        # {
        #     "actions": [{
        #         "tag": "button",
        #         "text": {
        #             "content": "查看测试报告",
        #             "tag": "lark_md"
        #         },
        #         "url": JOB_URL + "allure",
        #         "type": "default",
        #         "value": {}
        #     }],
        #     "tag": "action"
        # }
        ],
        "header": {
            "title": {
                "content": "大家好",
                "tag": "plain_text"
            }
        }
    }
}
requests.request(method=method, url=url, headers=headers, json=json)

