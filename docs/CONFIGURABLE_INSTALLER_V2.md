# Configurable Booksy Installer v2

The installer now includes the reusable improvements discovered while building Precision Cuts:

- Business name, logo, hero, domain, phone, address, directions, Facebook, email, and Booksy profile from `portal.json`
- Config-driven service selectors for Book and runtime compatibility
- Booksy widget loader generated from each business's `widgetId`
- Seven-day footer hours from configuration
- Contact address replacement without duplication
- Config-driven Gallery page
- First three gallery images on the homepage
- Removal of obsolete concept and inherited admin pages
- Business-neutral generated runtime and styles
- Clean `develop` branch initialization and first commit

Live availability remains disabled until each business receives dedicated Lambda/API Gateway routes and its real `availabilityApiBase`.

## Command

```bash
tools/create_booksy_project.sh CONFIG_JSON OUTPUT_DIRECTORY [ASSET_DIRECTORY]
```

The optional asset directory may contain `logo`, `hero`, `favicon`, and a `gallery/` directory.
