#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2021/4/16 10:42 上午
# @Name    : peilun
# @File    : Fly_book.py
# @Software: PyCharm
import sys
sys.path.append("..")
import jenkins
from comment.readConfig import *
from comment.log import *
import requests
import json

'''
jenkins持续集成飞书发送报告通知
'''

class flyb():
    def __init__(self):
        self.errorMsg = ""
        self.tile = time.strftime("%Y-%m-%d %H:%M:%S")
        try:
            self.jenkins_url = con.jenkins_url
            self.server = jenkins.Jenkins(self.jenkins_url, username=con.jenkins_name, password=con.jenkins_passwd)

            # 获取jenkins_url
            self.job_name = "job/autotest/"  # job名称
            self.job_url = self.jenkins_url + self.job_name  # job的url地址
            # 获取最后一次构建
            self.job_last_number = self.server.get_info(self.job_name)['lastBuild']['number']
            # #获取报告地址
            self.report_url = self.job_url + str(self.job_last_number) + '/allure'  # 报告地址
            log.debug("jenkins地址：%s" % self.report_url)
        except Exception as e:
            self.errorMsg = str(e)
            log.info("jenkins连接异常 %s" %e)



    def ly_data(self):

        #获取生成的txt报告数据
        d = {}
        proDir = "/allure-report/export/prometheusData.txt"
        f = open(con.allure_path + proDir, 'r')
        for lines in f:
            for c in lines:
                launch_name = lines.strip('\n').split(' ')[0]
                num = lines.strip('\n').split(' ')[1]
                d.update({launch_name: num})
        f.close()
        retries_run = d.get('launch_retries_run')  # 运行总数
        status_passed = d.get('launch_status_passed')  # 通过数量
        status_failed = d.get('launch_status_failed')  # 不通过数量
        status_broken = d.get('launch_status_broken')  # 异常数量
        try:
            url_path = 'https://open.feishu.cn/open-apis/bot/v2/hook/'
            url = url_path+con.fly
            log.debug("webhook地址: %s"% url)

            headers = {
                'content-type': "application/json"
            }


            payload = {
                "mobiles": "13282148187",
                "msg_type": "post",
                "content": {
                    "post": {
                        "zh_cn": {
                            "title": "项目接口测试报告",
                            "content": [
                                [
                                    {
                                        "tag": "text",
                                        "text": "项目名称: "
                                    },
                                    {
                                        "tag": "text",
                                        "text": "储能管家\n"
                                    },
                                    {
                                        "tag": "text",
                                        "un_escape": True,
                                        "text": "报告链接:  "
                                    },
                                    {
                                        "tag": "a",
                                        "text": "链接\n",
                                        "href": self.report_url
                                    },
                                    {
                                        "tag": "text",
                                        "text": "监测分支: "
                                    },
                                    {
                                        "tag": "text",
                                        "text": "master\n"
                                    },
                                    {
                                        "tag": "text",
                                        "text": "运行总数: "
                                    },
                                    {
                                        "tag": "text",
                                        "text": retries_run+"\n"
                                    },
                                    {
                                        "tag": "text",
                                        "text": "通过数量: "
                                    },
                                    {
                                        "tag": "text",
                                        "text": status_passed+"\n"
                                    },
                                    {
                                        "tag": "text",
                                        "text": "异常数量: "
                                    },
                                    {
                                        "tag": "text",
                                        "text": status_broken+"\n"
                                    },
                                    {
                                        "tag": "text",
                                        "text": "不通过数量: "
                                    },
                                    {
                                        "tag": "text",
                                        "text": status_failed+"\n"
                                    },
                                    {
                                        "tag": "text",
                                        "text": "运行时间: "
                                    },
                                    {
                                        "tag": "text",
                                        "text": self.tile
                                    }
                                ]
                            ]
                        }
                    }
                }
            }

            response = requests.request("POST", url, headers=headers, data=json.dumps(payload))
            log.info(response.text)

        except Exception as e:
            self.errorMsg = str(e)
            log.info("接口请求异常 %s" % e)






f = flyb()
f.ly_data()