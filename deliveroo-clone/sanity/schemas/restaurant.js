import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.required().max(200)
    }),
    defineField({
      name: 'image',
      title: 'Image of the Restaurant',
      type: 'image',
      to: {type: 'author'},
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of the Restaurant',
      type: 'number'
    }),
    defineField({
      name: 'long',
      title: 'Longitude of the Restaurant',
      type: 'number'
    }),
    defineField({
      name: 'address',
      title: 'Restaurant Address',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Enter a rating from (1-5 Stars)',
      type: 'number',
      validation: (Rule) => 
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a Value between 1 and 5")
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{ type: "reference", to: [{ type: "dishes" }]}]
    }),
  ]
})
