export const standard = defineScenario({
  comment: {
    //name of the model
    jane: {
      //friendly name for scenario data that can be referenced during tests => e.g. scenario.comment.one.name (`data` gets unwrapped)
      data: {
        //actual data to be put in the db
        name: 'Jane Doe', //fields corresponding to the schema with their values. Initial values are just the types of the fields
        body: 'I like trees',
        post: {
          create: {
            title: 'Redwood Leaves',
            body: 'The quick brown fox jumped over the lazy dog.',
          },
        },
      }, //you can also use select/include with Prisma syntax
    },

    john: {
      data: {
        name: 'John Doe',
        body: 'Hug a tree today',
        post: {
          create: {
            title: 'Root Systems',
            body: 'The five boxing wizards jump quickly.',
          },
        },
      },
    },
  },
})

export const postOnly = defineScenario({
  post: {
    bark: {
      data: {
        title: 'Bark',
        body: "A tree's bark is worse than its bite",
      },
    },
  },
})
