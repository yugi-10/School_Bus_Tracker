from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest
import time

class SchoolBusTrackerTests(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        # Clear cookies to ensure no session or token persists between tests
        self.driver.delete_all_cookies()

    def test_login_valid_credentials(self):
        driver = self.driver
        driver.get("http://localhost:5173/login")
        time.sleep(1)
        driver.find_element(By.NAME, "Email").send_keys("admin@example.com")
        driver.find_element(By.NAME, "Password").send_keys("password123")
        driver.find_element(By.TAG_NAME, "button").click()
        time.sleep(2)
        self.assertIn("dashboard", driver.current_url)

    def test_login_invalid_credentials(self):
        driver = self.driver
        driver.get("http://localhost:5173/login")
        time.sleep(1)
        driver.find_element(By.NAME, "email").send_keys("wrong@example.com")
        driver.find_element(By.NAME, "password").send_keys("wrongpassword")
        driver.find_element(By.TAG_NAME, "button").click()
        time.sleep(2)
        self.assertIn("login", driver.current_url)

    def test_unauthorized_admin_access_redirect(self):
        driver = self.driver
        driver.get("http://localhost:5173/admin-dashboard")
        time.sleep(2)
        
        # Debugging: Print the current URL after attempting to access the admin page
        print(f"Current URL after accessing admin: {driver.current_url}")
        
        # Check if the user is redirected to the login page
        self.assertIn("login", driver.current_url)

    def test_logout_redirects_to_login(self):
        driver = self.driver
        driver.get("http://localhost:5173/login")
        driver.find_element(By.NAME, "email").send_keys("admin@example.com")
        driver.find_element(By.NAME, "password").send_keys("password123")
        driver.find_element(By.TAG_NAME, "button").click()
        time.sleep(2)
        driver.find_element(By.XPATH, "//button[contains(text(), 'Sign Out')]").click()
        time.sleep(2)
        self.assertIn("login", driver.current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
