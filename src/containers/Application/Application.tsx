import React, { useState } from "react";
import Card from "../Card";
import Form, { FormData } from "../../components/Form";
import UserInfo from "../../components/UserInfo";
import "./application.css";

/*ript to run this application.</noscript> <div id="app">  </div> <script type="module" src="index.12e259af.js"></script> </body></html>
Create a react project using the create-react-app utility script. After that create the following components:
- Card component that will be used as a wrapper. The card will be rectangular with rounded corners and can accept as a prop the background color.
- Button component that accepts as props the text of button,
    paddings inside the button the
    background color,
    the text color and any other prop you think should be useful.
- Create a heading component which renders the primary header of the application and a SubHeading component for the secondary header.
- Create a custom Input component. The Input component will also render the label. The input will accept as props the label, placeholder,
id and any other prop you think is necessary. Style the Input component as you like.
- Render a form inside the Card component. The form will have a heading and a subheading (using the components created) and the following fields: name, surname, email, age, favorite color and two radio buttons with male, and female, as options. It should also have a checkbox with the label in case you would like to receive notifications.
- The input component should be used to render each field on the form..

- As a validation, for the name, surname and favorite color, the value must be a string without any numbers or special characters.
  The email should contain the @ symbol and the age must be a number greater than zero.

- For the previous input components, every time one of them loses focus the validation must run.
  If there is an error, then the outline of the input should become red and a message under the input should appear informing the user about the error.

  - The form should have two buttons. A cancel button with red background color and white text color and
    a submit button with green background and light yellow text color. The submit button will be disabled until every input of the form is filled.

- If the cancel button is clicked, then every input of the form is cleared.
If the submit button is clicked then display a new Card component with different background color underneath the form card component.
The new card must display the submitted data and the original form inputs should be cleared.

Submission

Submit your project by creating a public repository on GitHub. Please DELETE the ‘master’ or ‘main’ branch and push your code to a branch called ‘sample’. (this is to prevent google from indexing your project). Submit your repository’s link via Upwork or email.

Technical requirements and stack

- Please use the latest stable version of node js
- You may not install any additional UI/UX libraries or frameworks

How you will be evaluated:

- Demonstrate your genuine interest in the position by committing 2-4 hours to a screening project
- Prove your knowledge of industry best practices without being explicitly directed as to what they are. That said, do not use any libraries or packages not listed in the Technical requirements
- We value your time and do not want to encourage a culture of self-sacrifice for a project that will never be used in production. Do yourself a favor and submit the project as soon as you've met the requirements and implemented best practices across the project.


Additional Information

If you are relatively competent in React, there is no reason this app should take you much longer than 2-4 hours. That is not a time restriction. It’s only an estimated time to completion.

The instructions above should be clear enough for you to complete the task without any additional information.

*/

const Application: React.FC<Record<string, never>> = () => {
  const cardsColors = [
    "#a31545",
    "#6d1b7b",
    "#2196f3",
    "#6fbf73",
    "#ff9800",
    "#8561c5",
    "#00bcd4",
    "#4dabf5",
    "#00bcd4",
  ];
  const [formsData, setFormsData] = useState<FormData[][]>([]);
  const onSubmit = (formData: FormData[]) => {
    setFormsData([...formsData, formData]);
  };

  return (
    <>
      <Card>
        <Form onSubmit={onSubmit} />
      </Card>
      {formsData.map((formData, idx) => {
        return (
          <Card key={idx} background={cardsColors[idx % cardsColors.length]}>
            <UserInfo formData={formData} />
          </Card>
        );
      })}
    </>
  );
};

export default Application;
