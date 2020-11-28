from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
import time

browser=webdriver.Firefox()
buzz1 = ActionChains(browser)
buzz2 = ActionChains(browser)
buzz3 = ActionChains(browser)

browser.get("https://mdb571.github.io/quizzypi/")
time.sleep(5)
input=browser.find_element_by_id("players")

buzz1.send_keys(Keys.NUMPAD1)
print("1 pressed")
buzz1.perform()
time.sleep(15)
buzz2.send_keys(Keys.NUMPAD2)
print("2 pressed")
buzz2.perform()
