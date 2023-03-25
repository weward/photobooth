# TEMPLATES


> ## Table of Contents
- [[Admin] Template Index Page](#admin-template-index-page)
- [[User] Template Index-page](#user-template-index-page)
- [[User] Template Customization page](#user-template-customization-page)
    - [UserTemplates JSON Format](#a-usertemplates-json-format)



.
## [Admin] Template Index Page

---

- **System** loads all templates from the database/`redis`
- **System** displays the status of each template
- **System** displays the default template in the first row. This template is also used as the user’s default template with default values.
- **Admin** may select and set the default template. This template will, from the time of selection, be used as the default user template (if the user has not configured one yet).
- **System** will require the admin to modify/configure the currently selected default template and provide default values.
- _**System** requires at least one template on record. And this template will serve as the default._

## [User] Template Index Page

---

- **System** \`\`loads the active templates from the API upon user access to the`Template`Configuration  section of the `User`'s portal
- **User** is presented with a list of active templates and the user's `configured` template
- **System** displays the user’s default template (as per admin’s choice) that was set as the user’s default template during registration.
- **System** adds a button/link to configure to each list item in the `active` templates section
- **User** may choose to configure a template and is redirected to a `template customization` page

## [User] Template Customization page

---

- **System** loads the `preview` of the chosen template
- **System** displays the `print size` options
- **System** displays option to `upload a logo` or logos depending on the chosen template
- **System** displays a text field where the template's `text fields can be customized`
- **User** saves the configured template
- **System** saves the user-configured template to `UserTemplates` >**[[A]](#a-usertemplates-json-format)**< json format
- **System** sets the configured template as the user’s default template if and when it is the only user-configured template.
- _**There must always be at least one chosen user-configured template.**_

‌

### [A] UserTemplates JSON Format

Just save the configuration/user-customized fields in _JSON_ format:


```
ID
template_id (FK - templates)
user_id (FK - users)
config: {
  label: <string>,
  img: <string> img url,
  img-2: <string> img-2 url,
}
```
