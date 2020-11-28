from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
import time
import RPi.GPIO as GPIO
import os




GPIO.setmode (GPIO.BCM)
GPIO.setwarnings(False)

# setup gpio for echo & trig
def start_sensor():
    echopin = [4,24,18]
    trigpin = [3,21,15]

    for j in range(3):
        GPIO.setup(trigpin[j], GPIO.OUT)
        GPIO.setup(echopin[j], GPIO.IN)
    try:
        # main loop
        while True:
            # get distances and assemble data line for writing 
            for j in range(3):
                distance = ping(echopin[j], trigpin[j])    
                if distance<20:
                    if j==0:
                        buzz1.send_keys(Keys.NUMPAD1)
                        print("Player 1 buzzed")
                        buzz1.perform()
                        time.sleep(5)
                    elif j==1:
                        buzz3.send_keys(Keys.NUMPAD3)
                        print("Player 3 buzzed")
                        buzz3.perform()
                        time.sleep(5)
                    else:
                        buzz2.send_keys(Keys.NUMPAD2)
                        print("Player 2 buzzed")
                        buzz2.perform()
                        time.sleep(5)
                print ("sensor", j+1,": ",distance,"cm")
                        
    except KeyboardInterrupt:
        print("Exiting..")
        GPIO.cleanup()  
      
  
# Get reading from HC-SR04   
def ping(echo, trig):
    
    GPIO.output(trig, False)
    # Allow module to settle
    time.sleep(0.5)
    GPIO.output(trig, True)
    time.sleep(0.00001)
    GPIO.output(trig, False)
    pulse_start = time.time()


    while GPIO.input(echo) == 0:
        pulse_start = time.time()
        

    
    while GPIO.input(echo) == 1:
        pulse_end = time.time()
        
    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150
    
    distance = round(distance, 2)
    
    return distance




browser=webdriver.Chrome(executable_path='/usr/bin/chromedriver')
buzz1 = ActionChains(browser)
buzz2 = ActionChains(browser)
buzz3 = ActionChains(browser)

browser.get("https://mdb571.github.io/quizzypi/")
time.sleep(5)
input=browser.find_element_by_id("players")

start_sensor()

