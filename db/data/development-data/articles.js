const oldArticles = require("./oldArticles");

const yearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

const newArticles = oldArticles.map((oldArticle) => {
  const newArticle = { ...oldArticle };
  const randomDate =
    Date.now() -
    3 * yearInMilliseconds +
    Math.floor(Math.random() * (3 * yearInMilliseconds));
  newArticle.created_at = randomDate;
  return newArticle;
});

const literatureArticles = [
  {
    title: "Exploring Classic Novels: Timeless Tales for Every Reader",
    topic: "literature",
    author: "grumpy19",
    body: "Classic novels hold a special place in the literary world, offering readers a glimpse into different eras, cultures, and perspectives. From the enchanting romance of Jane Austen's novels to the thought-provoking themes of Charles Dickens' works, there's a classic novel for every reader to cherish.",
    created_at: 1649347200000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/classics.jpg",
  },
  {
    title: "The Power of Words: How Literature Shapes Our Lives",
    topic: "literature",
    author: "happyamy2016",
    body: "Literature has the remarkable ability to impact and shape our lives. Through the pages of a book, we can experience emotions, travel to new worlds, and gain insights into the human condition. Whether it's a classic novel, a modern bestseller, or a timeless poem, literature has a profound influence on our thoughts and perspectives.",
    created_at: 1652803200000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/words.jpg",
  },
  {
    title: "Book Review: 'The Enigmatic Garden' by Emily Rivers",
    topic: "literature",
    author: "cooljmessy",
    body: "In Emily Rivers' latest novel, 'The Enigmatic Garden,' readers are transported to a world of mystery and intrigue. The author's lyrical prose and vivid descriptions create an enchanting atmosphere that captivates from the first page to the last. With its compelling characters and unexpected twists, this book is a must-read for fans of literary fiction.",
    created_at: 1656288000000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/enigmatic-garden.jpg",
  },
  {
    title: "Diving into Dystopia: Exploring Dark Themes in Modern Literature",
    topic: "literature",
    author: "weegembump",
    body: "Dystopian literature has gained significant popularity in recent years, reflecting societal anxieties and challenging our notions of the future. From Margaret Atwood's 'The Handmaid's Tale' to George Orwell's '1984,' these novels offer a mirror to our world while delving into unsettling and thought-provoking themes.",
    created_at: 1659744000000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/dystopia.jpg",
  },
  {
    title: "Unveiling the Layers: Symbolism in Literature",
    topic: "literature",
    author: "tickle122",
    body: "Symbols are powerful tools that authors use to convey deeper meanings in their works. From the elusive green light in 'The Great Gatsby' to the mockingjay in 'The Hunger Games,' symbolism adds layers of complexity and invites readers to explore the hidden significance within a story.",
    created_at: 1663228800000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/symbolism.jpg",
  },
  {
    title: "A Journey Through Genre: Exploring Literary Diversity",
    topic: "literature",
    author: "grumpy19",
    body: "Literature encompasses a wide range of genres, from romance and mystery to science fiction and fantasy. Each genre offers a unique reading experience and allows authors to explore different themes and storytelling techniques. Embracing literary diversity opens the door to a world of captivating narratives.",
    created_at: 1666694400000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/diversity.jpg",
  },
  {
    title: "Rediscovering the Classics: Time-Tested Tales That Still Resonate",
    topic: "literature",
    author: "weegembump",
    body: "Classic literature holds its appeal across generations for a reason. Stories like 'Pride and Prejudice' and 'Moby-Dick' continue to resonate with readers today, addressing universal themes and offering insights into the complexities of human nature that remain relevant throughout time.",
    created_at: 1670179200000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/Shakespeare+and+Dickens.jpg",
  },
  {
    title: "Book Spotlight: 'Whispers in the Woods' by Harper Lane",
    topic: "literature",
    author: "happyamy2016",
    body: "Harper Lane's 'Whispers in the Woods' is a captivating tale that seamlessly blends elements of fantasy and mystery. With its enchanting setting and well-crafted characters, this novel takes readers on a journey filled with magic, secrets, and unexpected discoveries. Lane's lyrical prose creates an immersive reading experience that lingers long after the last page.",
    created_at: 1673654400000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/whispers-woods.jpg",
  },
  {
    title: "The Art of Character Development in Literature",
    topic: "literature",
    author: "weegembump",
    body: "Compelling characters are at the heart of memorable stories. Authors skillfully craft protagonists, antagonists, and supporting characters with depth, flaws, and motivations that resonate with readers. Exploring the techniques behind character development reveals the intricate artistry that brings fictional personas to life.",
    created_at: 1677129600000,
    votes: 0,
    article_img_url: "https://sophocles99-images.s3.eu-west-2.amazonaws.com/character.jpg",
  },
  {
    title: "Book Review: 'Echoes of Eternity' by Sofia Ramirez",
    topic: "literature",
    author: "happyamy2016",
    body: "Sofia Ramirez's 'Echoes of Eternity' is a breathtaking exploration of love and destiny that spans across time. Through intertwining narratives, Ramirez weaves a tale of passion, loss, and the enduring power of human connection. With evocative prose and richly drawn characters, this novel is a testament to the enduring allure of romantic fiction.",
    created_at: 1680604800000,
    votes: 0,
    article_img_url:
      "https://sophocles99-images.s3.eu-west-2.amazonaws.com/echoes-eternity.jpg",
  },
];

module.exports = newArticles.concat(literatureArticles);
