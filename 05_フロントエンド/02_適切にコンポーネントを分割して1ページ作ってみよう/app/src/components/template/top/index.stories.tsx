import { ComponentMeta, ComponentStory } from "@storybook/react";
import Top from "components/template/top";

export default {
  title: "Template/Top",
  componet: Top,
} as ComponentMeta<typeof Top>;

const Template: ComponentStory<typeof Top> = (args) => <Top {...args} />;

export const Default = Template.bind({});
Default.args = {
  articleList: [
    {
      date: new Date(),
      tagLabel: "Laravel",
      tagHref: "#",
      title: "Build Your New Idea with Laravel Freamwork.",
      href: "#",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
      authorName: "Alex John",
      authorHref: "#",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
    },
    {
      date: new Date(),
      tagLabel: "Design",
      tagHref: "#",
      title: "Accessibility tools for designers and developers",
      href: "#",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
      authorName: "Jane Doe",
      authorHref: "#",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
    },
  ],
  authorList: [
    {
      authorName: "Alex John",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
      authorPostsAmount: 23,
    },
    {
      authorName: "Jane Doe",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
      authorPostsAmount: 52,
    },
  ],
  categoryList: [
    {
      text: "AWS",
      href: "#",
    },
    {
      text: "Laravel",
      href: "#",
    },
  ],
  recentPost: {
    tagHref: "#",
    tagText: "Laravel",
    postHref: "#",
    postTitle: "Build Your Name Idea with Laravel Freamwork",
    authorName: "Alex John",
    authorHref: "#",
    authorThumbnailSrc:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
    postDate: new Date(),
  },
};
