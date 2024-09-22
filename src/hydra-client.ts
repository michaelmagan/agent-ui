// This is where you register your components with Hydra.
// You can also register tools (functions that can be called from your components)
// and actions (side effects that can be performed by your components).

import {
  HydraCarouselSchema,
  HydraFeedbackSchema,
  HydraFormSchema,
  HydraProfileSchema,
  HydraRecentTweetsSchema,
  HydraTextSchema,
} from "@/model/hydra"
import {
  getAllUserProfilesFn,
  getProfileDataForUserFn,
  getTwitterDataFn,
} from "@/tinkerer.service"
import { queryPineconeForDocuments } from "@/yc.service"
import { HydraClient } from "hydra-ai"
import { zodToJsonSchema } from "zod-to-json-schema"

import { HydraCarousel } from "@/components/hydra/carousel"
import { Feedback } from "@/components/hydra/feedback"
import { HydraForm } from "@/components/hydra/form"
import { RecentTweets } from "@/components/hydra/recentTweets"
import { HydraText } from "@/components/hydra/text"
import { HydraQueryConstructor } from "@/components/hydra/query-constructor"

export const getHydraClient = (): HydraClient => {
  const hydra = new HydraClient()
  return hydra
}

const getProfileDataForUser = {
  getComponentContext: getProfileDataForUserFn,
  definition: {
    name: "getProfileDataForUser",
    description: "Get user profile data from username",
    parameters: [
      {
        name: "email",
        type: "string",
        description: "Email of the user whose profile is being queried",
        isRequired: true,
      },
    ],
  },
}

const getTwitterPostsTool = {
  getComponentContext: getTwitterDataFn,
  definition: {
    name: "getTwitterData",
    description: "Get relevant Twitter data based on the given query.",
    parameters: [
      {
        name: "twitterHandle",
        type: "string",
        description:
          "The Twitter handle of the user whose tweets are being queried. The tool should return recent tweets for the given user.",
        isRequired: true,
      },
    ],
  },
}

const getAllUserProfiles = {
  getComponentContext: getAllUserProfilesFn,
  definition: {
    name: "getAllUserProfiles",
    description: "Get all user profiles",
    parameters: [],
  },
}

export const registerHydraComponents = async (hydra: HydraClient) => {
  await Promise.all([
    hydra.registerComponent(
      "HydraCarousel",
      "A carousel of cards component for displaying multiple cards in a carousel format. Each card should include as many relevant links as possible, represented as buttons. These links should be derived from the content and context of each card, providing comprehensive navigation options for users. Ensure that every potential action or related information has a corresponding button link.",
      HydraCarousel,
      {
        HydraCarousel: zodToJsonSchema(HydraCarouselSchema),
      },
      [getAllUserProfiles]
    ),
    hydra.registerComponent(
      "HydraText",
      "A text component for creating and generating text content. Generate text based on the context and the user's query. Each field should have a unique 'id' that corresponds to the data it represents. The 'share' property allows defining multiple sharing options, each with a custom URL template. In the URL template, use {fieldId} placeholders to insert field values when sharing.",
      HydraText,
      {
        HydraText: zodToJsonSchema(HydraTextSchema),
      }
    ),
    //hydra.registerComponent(
      //"HydraForm",
      //"A form component for creating and submitting user input. The form can have multiple fields of various types, and a submit button. Each field should have a unique 'id', 'label', and 'type'. The form handles submission and passes the data to the provided onSubmit function.",
      //HydraForm,
      //{
        //HydraForm: zodToJsonSchema(HydraFormSchema),
      //}
    //),
    //hydra.registerComponent(
    //"Profile",
    //"A profile component for displaying user information including name, avatar, social media links, and compatibility score.",
    //Profile,
    //{
    //Profile: zodToJsonSchema(HydraProfileSchema),
    //}
    //),
    hydra.registerComponent(
      "Feedback",
      "A feedback component for collecting user feedback with thumbs up and thumbs down buttons.",
      Feedback,
      {
        Feedback: zodToJsonSchema(HydraFeedbackSchema),
      }
    ),
    hydra.registerComponent(
      "RecentTweets",
      "A component for displaying recent tweets. It shows up to three recent tweets, each including the author's avatar, name, handle, tweet content, and timestamp. It also provides a button to open the author's Twitter profile.",
      RecentTweets,
      {
        RecentTweets: zodToJsonSchema(HydraRecentTweetsSchema),
      },
      [getTwitterPostsTool]
    ),
    hydra.registerComponent(
      /*
      "HydraCarousel",
      "A carousel of cards component for displaying multiple cards in a carousel format. Each card should include as many relevant links as possible, represented as buttons. These links should be derived from the content and context of each card, providing comprehensive navigation options for users. Ensure that every potential action or related information has a corresponding button link.",
      HydraCarousel,
      {
        HydraCarousel: zodToJsonSchema(HydraCarouselSchema),
      },
      [getYCDataTool]
    ),
    hydra.registerComponent(
      "HydraText",
      "A text component for creating and generating text content. Generate text based on the context and the user's query. Each field should have a unique 'id' that corresponds to the data it represents. The 'share' property allows defining multiple sharing options, each with a custom URL template. In the URL template, use {fieldId} placeholders to insert field values when sharing.",
      HydraText,
      {
        HydraText: zodToJsonSchema(HydraTextSchema),
      }
    ),
    */
      "HydraQueryConstructor",
      `Based on a user's query, generate a form with 5 to 6 follow-up questions to better understand the user's request. Follow these guidelines:

Use the questions as labels for form fields.
For each question, choose an appropriate input type:

Use dropdown menus for single selections from multiple options.
Use checkboxes for multiple-choice questions where more than one option can be selected.
Use radio buttons for questions with mutually exclusive options (either/or choices).


Ensure at least one question uses checkboxes for multiple select data.
Use radio buttons only for binary choices or mutually exclusive options.
Provide a diverse range of input types across the form.
For open-ended questions, use text input fields.

Example structure:
[Dropdown] Industry selection
[Checkboxes] Skills needed (multiple selection allowed)
[Radio buttons] Experience level (single selection)
[Text input] Specific location (if applicable)
[Dropdown] Commitment level expected
Always include options or placeholder text for each input type to demonstrate how it should be used. When generating the form, pay special attention to the question about skills for a co--founder. For this question:

Use checkboxes to allow multiple skill selections.
Provide at least 5-7 common skills as options.
Include an 'Other' option with a text input field.

Example format for the skills question:
What skills are you looking for in a co-founder? (Select all that apply)
[ ] Technical/Programming
[ ] Business Development
[ ] Marketing
[ ] Finance/Accounting
[ ] Product Management
[ ] Design/UX
[ ] Sales
[ ] Other: [Text input field]
Ensure that each checkbox is properly labeled and that multiple selections are possible.`,
      HydraQueryConstructor,
      {
        HydraQueryConstructor: zodToJsonSchema(HydraFormSchema),
      },
      []
    ),
  ])
}
