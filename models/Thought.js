// Import necessary Mongoose components and the dateFormat utility function
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Define a subdocument schema for reactions to thoughts
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId, // Unique ID for the reaction
      default: () => new Types.ObjectId(), // Automatically generate a new ObjectId
    },
    reactionBody: {
      type: String, // Text content of the reaction
      required: true, // Make this field mandatory
      maxlength: 280, // Limit the length of the reaction text
    },
    username: {
      type: String, // The username of the user who created the reaction
      required: true, // Make this field mandatory
    },
    createdAt: {
      type: Date, // Timestamp for when the reaction was created
      default: Date.now, // Default to the current date and time
      get: (createdAtVal) => dateFormat(createdAtVal), // Format the date using the dateFormat utility
    },
  },
  {
    toJSON: {
      getters: true, // Enable the use of getters
    },
  }
);

// Define the main schema for thoughts
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String, // Text content of the thought
      required: true, // Make this field mandatory
      maxlength: 280, // Limit the length of the thought text
    },
    createdAt: {
      type: Date, // Timestamp for when the thought was created
      default: Date.now, // Default to the current date and time
      get: (createdAtVal) => dateFormat(createdAtVal), // Format the date using the dateFormat utility
    },
    username: {
      type: String, // The username of the user who created the thought
      required: true, // Make this field mandatory
    },
    reactions: [reactionSchema], // Embed the reaction subdocument schema
  },
  {
    toJSON: {
      virtuals: true, // Enable the use of virtual properties
      getters: true, // Enable the use of getters
    },
    id: false, // Disable the automatic creation of an "id" virtual property
  }
);

// Define a virtual property 'reactionCount' to get the number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length; // Return the length of the reactions array
});

// Create the Thought model from the thoughtSchema
const Thought = model("Thought", thoughtSchema);

// Export the Thought model for use elsewhere in the application
module.exports = Thought;
