// This is where you register your components with Hydra.
// You can also register tools (functions that can be called from your components)
// and actions (side effects that can be performed by your components).

import { HydraCarouselSchema, HydraTextSchema, HydraFormSchema, HydraProfileSchema, HydraFeedbackSchema, HydraRecentTweetsSchema } from "@/model/hydra"
import { queryPineconeForDocuments } from "@/yc.service"
import { HydraClient } from "hydra-ai"
import { zodToJsonSchema } from "zod-to-json-schema"

import { HydraCarousel } from "@/components/hydra/carousel"
import { HydraText } from "@/components/hydra/text"
import { HydraForm } from "@/components/hydra/form"
import { Profile } from "@/components/hydra/profile"
import { Feedback } from "@/components/hydra/feedback"
import { RecentTweets } from "@/components/hydra/recentTweets"
import { getProfileDataForUserFn, getAllUserProfilesFn, getTwitterDataFn } from "@/tinkerer.service"

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
        description:
          "Email of the user whose profile is being queried",
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
    hydra.registerComponent(
      "HydraForm",
      "A form component for creating and submitting user input. The form can have multiple fields of various types, and a submit button. Each field should have a unique 'id', 'label', and 'type'. The form handles submission and passes the data to the provided onSubmit function.",
      HydraForm,
      {
        HydraForm: zodToJsonSchema(HydraFormSchema),
      }
    ),
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
  ])
}
