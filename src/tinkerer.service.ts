interface Person {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  title: string;
  email: string;
  linkedin_url: string;
  twitter_handle: string;
  github_url: string;
  employment: string;
  education: string;
  role: string;
  biography: string;
  skills: string;
  areas_of_interest: string;
  projects: string;
  twitter_roast: string;
}

const people: Person[] = [
  {
    id: 1,
    first_name: "Joe",
    last_name: "Heitzeberg",
    company_name: "AI-Tinkerers",
    title: "Founder",
    email: "heitzeberg@example.com",
    linkedin_url: "https://www.linkedin.com/in/heitzeberg",
    twitter_handle: "@joeheitzeberg",
    github_url: "https://github.com/heitzeberg",
    employment: "Employed",
    education: "MBA at MIT and B.S. in Computer Science at UW, also studied Technical Japanese at UW",
    role: "Entrepreneur / Founder",
    biography: "",
    skills: "I have a strong technical background with expertise in generative AI. I have experience building and leading high-performing teams. I have been a founding CEO and worn every hat.",
    areas_of_interest: "I can advise your company and help secure seed funding and kickstart growth at its earliest stages. I can help you hire and scale. With AI Tinkerers I can help next-generation AI companies break through the noise and make a dent in the word and hire great teams. Building a strong AI ecosystem is important to me, and I am always eager to connect with talented individuals and organizations to foster collaboration and innovation within the AI community.",
    projects: "Building the AI Tinkerers community and platform to enhance member engagement and collaboration, using tons of Gen AI and every new thing I can get my hands on.",
    twitter_roast: "Congratulations, Joe! You've managed to turn your midlife crisis into a full-blown AI obsession. Your tweets read like a desperate attempt to stay relevant in a world that's moving faster than your receding hairline. You're the tech equivalent of that uncle who won't stop talking about his new hobby at family gatherings. 'AI this, AI that' – we get it, you're trying to compensate for something. Your 'human-in-the-loop' fixation is just a sad cry for attention in a world where machines are becoming smarter than you. But hey, at least you've found a way to feel important by organizing hackathons for people who actually know what they're doing. Keep riding that AI wave, Joe – it's the only thing keeping you afloat in the sea of irrelevance."
  },
  {
    id: 2,
    first_name: "Aaron",
    last_name: "Villalpando",
    company_name: "BoundaryML",
    title: "Founder",
    email: "Villalpando@example.com",
    linkedin_url: "https://www.linkedin.com/in/aaron-villalpando-99284576",
    twitter_handle: "@aaron__vi",
    github_url: "",
    employment: "Employed",
    education: "BS in Computer Science at The University of Texas at Austin",
    role: "Entrepreneur / Founder",
    biography: "",
    skills: "Aaron Villalpando possesses technical strengths in software development, system architecture, and project management, with expertise in AWS and Android development. He has over 8 years of experience, primarily at Amazon, working on notable projects such as Prime Video and Twitch.",
    areas_of_interest: "",
    projects: "Working on BAML, a domain specific language to write and test llm functions",
    twitter_roast: "Ah, Aaron, the self-proclaimed AI engineering savior. You're so obsessed with function calling, I bet you try to JSON.parse your breakfast cereal. Your tweets read like a desperate attempt to convince the world that your startup is relevant. Congrats on making the front page of r/localllama - I'm sure your mom is proud. You criticize Elon Musk's AI alarmism, yet you're the one sounding the alarm on every minor tech update. Maybe if you spent less time collecting Pokémon and more time actually innovating, your 'SOTA' claims wouldn't sound so hollow. But hey, at least you've mastered the art of humble-bragging about your YC batch - because that's clearly the pinnacle of tech success, right?"
  },
  {
    id: 3,
    first_name: "Dexter",
    last_name: "Horthy",
    company_name: "HumanLayer",
    title: "CEO",
    email: "dexterihorthy@example.com",
    linkedin_url: "https://www.linkedin.com/in/dexterihorthy",
    twitter_handle: "@dexhorthy",
    github_url: "https://www.github.com/dexhorthy",
    employment: "Employed",
    education: "BA in Physics at University of Chicago",
    role: "Entrepreneur / Founder",
    biography: "",
    skills: "DevOps and Developer Productivity (Kubernetes, Docker, AWS, GCP, CI/CD) ⭐️⭐️⭐️⭐️⭐️ Backend engineering (python, go, java) - ⭐️⭐️⭐️⭐️ Frontend (React, Tailwind, Next) - ⭐️⭐️⭐️ AI / ML (basic tuning, prompt engineering, Colab, Hugging Face) - ⭐️⭐️ Data and Analytics engineering (spark, databricks, snowflake, dbt, hex, looker, ) - ⭐️⭐️ Technical Go To Market (Solutions Architecture, Sales, Developer Communities, Product Discovery)",
    areas_of_interest: "Real-world AI Applications, Agentic Workflows with Slack or CLI frontends, SQL-specific text embeddings, programmatically understanding the value of data and datasets (specifically parquet, sql, other assets that are generated dynamically)",
    projects: "Working on https://humanlayer.dev / https://github.com/humanlayer/humanlayer, and an orchestration framework for autonomous outer loop agents.",
    twitter_roast: "Congratulations, you've managed to turn 'tech bro' into a personality. Your tweets read like a buzzword bingo card had a lovechild with a dad joke generator. You're so deep in the Kubernetes rabbit hole, you probably dream in YAML. But hey, at least you're 'hacking on things' - because God forbid you actually build something useful. Your attempt at humor is about as successful as a Docker container with no image. And let's talk about that hackathon excitement - nothing says 'I peaked in college' quite like getting hyped about 48 hours of caffeine-fueled coding. Maybe if you spent less time trying to be witty on Twitter and more time actually coding, you'd have something more impressive than a blog deployed on Kubernetes to show for it."
  },
  {
    id: 4,
    first_name: "Adam",
    last_name: "Burgh",
    company_name: "Alexandria AI",
    title: "Founder and CEO",
    email: "adamburgh@example.com",
    linkedin_url: "https://www.linkedin.com/in/adamburgh",
    twitter_handle: "@adamburgh",
    github_url: "https://www.github.com/00zero",
    employment: "Employed",
    education: "MBA at Harvard, BA in Economics and Political Science at UC Berkeley, and study abroad in Italian Language and European Politics at Istituto Lorenzo de Medici",
    role: "Executive (CEO, CTO, VP, etc.)",
    biography: "",
    skills: "Adam has successfully helped scale startups from 20 to 200 to thousands of employees across product, analytics, strategy, marketing, and operations.",
    areas_of_interest: "Leadership, scaling startups, product innovation and prioritization, growth marketing and strategy.",
    projects: "Knowledge discovery and sharing platform for employees to securely access their company's proprietary documents and information.",
    twitter_roast: "Adam, you're the kind of guy who'd try to build a time machine just to ask George Jetson if he needs a copy of 'The Jetsons' on DVD. Your relentless pursuit of perfection borders on the comical, like when you tried to invent a better mousetrap but ended up with a Rube Goldberg machine that could solve world hunger. Your Twitter feed is like a tech support hotline for the future – always troubleshooting the latest AI glitch. Keep trying to fix what ain't broke, Adam, because your attempts to improve the human condition are as endearing as your attempt to invent a flying car."
  },
  {
    id: 5,
    first_name: "Jacob",
    last_name: "Harbich",
    company_name: "DigitalOcean",
    title: "Solution Architect",
    email: "jacob-harbich@example.com",
    linkedin_url: "https://www.linkedin.com/in/jacob-harbich",
    twitter_handle: "@jacob-harbich",
    github_url: "",
    employment: "Employed",
    education: "AAS in High Performance Computing at Texas State Technical College Waco",
    role: "Other",
    biography: "",
    skills: "I possess strong technical skills in Linux system administration, cloud infrastructure, cloud architecture, Kubernetes, serverless, Containers, server configuration, virtual machines, troubleshooting servers, and customer support. I received my Certified Kubernetes Administration in May of 2024.",
    areas_of_interest: "Linux, Containers, AI, GPU, Serverless, Kubernetes, Cloud Architecture, Cloud Infrastructure, Compute.",
    projects: "",
    twitter_roast: "Jacob, you're the kind of guy who'd try to build a time machine just to ask George Jetson if he needs a copy of 'The Jetsons' on DVD. Your relentless pursuit of perfection borders on the comical, like when you tried to invent a better mousetrap but ended up with a Rube Goldberg machine that could solve world hunger. Your Twitter feed is like a tech support hotline for the future – always troubleshooting the latest AI glitch. Keep trying to fix what ain't broke, Jacob, because your attempts to improve the human condition are as endearing as your attempt to invent a flying car."
  }
];

export async function getProfileDataForUserFn(
  email: string
): Promise<Person | undefined> {
  // Return data for requested user
  return people.find(person => person.email.toLowerCase() === email.toLowerCase());
}

export async function getAllUserProfilesFn(): Promise<Person[]> {
  return people;
}
