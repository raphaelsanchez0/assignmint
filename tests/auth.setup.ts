import { test as setup, expect } from '@playwright/test';
const authFile = 'playwright/.auth/user.json';

const customerEmail01 = process.env.NEXT_PUBLIC_TEST_USERNAME_01
const customerPassword01 = process.env.NEXT_PUBLIC_TEST_PASSWORD_01

const customerEmail02 = 

setup('authenticate', async ({ page }) => {
})