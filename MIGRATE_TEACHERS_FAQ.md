# Instructions for the Harrigan Academy Site Agent

The user wants to migrate the `Teachers` and `FAQ` pages from an earlier prototype into this project (`d:\Harrigan Academy Site\harrigan-academy`).

## 1. Source Files Location
The code you need to retrieve is located in the `d:\Harrigan Academy` project:
*   `d:\Harrigan Academy\src\pages\Teachers.jsx`
*   `d:\Harrigan Academy\src\pages\FAQ.jsx`
*   `d:\Harrigan Academy\src\components\TeacherCard.jsx`

## 2. Adaptation and Styling
*   Copy the structure and logic (accordions, grids) of these files into this project.
*   **Crucial:** Do NOT copy the raw hardcoded colors or text styles blindly. YOU MUST inspect this project's current CSS, design tokens (e.g., Tailwind config, global CSS), and existing components to **adapt the copied code to match this project's exact aesthetic, color scheme, and typography**. It needs to blend seamlessly.

## 3. Dynamic Content Retrieval (Web Scraping)
Instead of using the hardcoded placeholder text from the prototype files, you must pull the live content from the original Harrigan Academy site.

**URL:** `https://harrigan-academy.com/`

**A. Teachers Data:**
*   Use your tools (e.g., `read_url_content` or `browser_subagent`) to fetch the current teacher profiles (names, roles, bios) from the URL.
*   *Design Requirement:* **John Harrigan** is the head of the academy. His card/profile must have a distinct **visual hierarchy** to stand out—for instance, making his card larger, placing him prominently at the very top outside the main grid, or giving his card a special border/background color that matches this project's premium look.

**B. FAQ Data:**
*   Similarly, fetch the Frequently Asked Questions from the URL to populate the data array that feeds the `FAQItem` accordion component.

## 4. Implementation
*   Integrate the adapted components and route them appropriately within the site's navigation structures.
*   Verify the appearance to ensure there are no styling conflicts or subpixel rendering artifacts.
