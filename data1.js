// Salty Academy game data · part 1 (P1, P2, M1, M2)
// Schema: cards {t term, d meaning, s say-it}, quiz {q, a[0]=correct, why},
// translate {setup, a[0]=best, why}, diagnose {say, a[0]=real problem, why}
window.ACADEMY_PART1 = [
{
  id: "p1", num: "P1", title: "Why Websites Lose Customers", icon: "🌊",
  read: "modules/reel-school-01.html",
  cards: [
    {id:"f.p1.conversion.a", c:["c.p1.conversion"], t:"Conversion", d:"The moment a visitor does the thing you wanted: books, buys, messages, calls.", s:"turning visitors into customers"},
    {id:"f.p1.cta.a", c:["c.p1.cta"], t:"Call to action (CTA)", d:"The button or line that tells the visitor what to do next.", s:"one clear next step"},
    {id:"f.p1.hero.a", c:["c.p1.hero"], t:"Hero", d:"The big first section of a page: headline, image, main button.", s:"the first thing people see"},
    {id:"f.p1.fold.a", c:["c.p1.fold"], t:"Above the fold", d:"Everything visible before scrolling. Prime real estate.", s:"before anyone even scrolls"},
    {id:"f.p1.speed.a", c:["c.p1.speed"], t:"Load time", d:"How long from tap to usable page.", s:"how fast it opens"},
    {id:"f.p1.speed.b", c:["c.p1.speed"], t:"First paint", d:"When the first real content appears on screen.", s:"the moment something shows up"},
    {id:"f.p1.bounce.a", c:["c.p1.bounce"], t:"Bounce", d:"A visitor who lands and leaves without doing anything.", s:"people who leave straight away"},
    {id:"f.p1.friction.a", c:["c.p1.friction"], t:"Friction", d:"Anything that makes the visitor think, wait, or guess.", s:"anything that makes people hesitate"},
    {id:"f.p1.proof.a", c:["c.p1.proof"], t:"Social proof", d:"Evidence others already trust you: reviews, clients, real numbers.", s:"proof you have done this before"},
    {id:"f.p1.value-prop.a", c:["c.p1.value-prop"], t:"Value proposition", d:"The one sentence explaining what you offer, for whom, and why you.", s:"what you do, in one sentence"},
    {id:"f.p1.five-second.a", c:["c.p1.five-second"], t:"Five second test", d:"Show a homepage for 5 seconds, then ask: what, for whom, what next?", s:"the five second test"},
    {id:"f.p1.choice-overload.a", c:["c.p1.choice-overload"], t:"Choice overload", d:"Too many options slow decisions down until no decision happens.", s:"too many choices means no choice"},
    {id:"f.p1.audit.a", c:["c.p1.audit"], t:"Audit", d:"A structured review of a site against these principles, ending in a fix list.", s:"we look at your site the way a customer does"},
    {id:"f.p1.credibility.a", c:["c.p1.credibility"], t:"Credibility", d:"Whether a stranger decides you look trustworthy and current.", s:"whether strangers trust you"}
  ],
  quiz: [
    {id:"q.p1.speed.a", c:["c.p1.speed","c.p1.bounce"], q:"Your customer opens your site on slow hotel wifi. Three seconds pass with nothing showing. What share of people like her are already gone?", a:["More than half","About a quarter","About three quarters","Almost nobody"], why:"Google's own numbers: past three seconds, more than half of mobile visitors are already gone."},
    {id:"q.p1.credibility.a", c:["c.p1.credibility"], q:"A stranger lands on your homepage for the first time. What share of people decide right then if your business feels real?", a:["About three in four","Around one in four","About half of all visitors","Nearly everyone who visits"], why:"Stanford's web credibility research: three quarters of first impressions are decided by pixels, not by anything you actually did."},
    {id:"q.p1.five-second.a", c:["c.p1.five-second"], q:"You flash your homepage at a friend for five seconds, then hide it. She can say what you sell and who it's for. What's the third thing she needs to answer?", a:["What do I do next?","How much does it cost?","Where are they located?","How long have they existed?"], why:"Miss any of the three and a real visitor already tapped back."},
    {id:"q.p1.bounce.b", c:["c.p1.bounce","c.p1.speed"], q:"Two friends look at your site. One says it's ugly. One says it took forever to load. Which complaint should worry you more?", a:["Slow. Nobody complains, they just leave","Ugly. Looks decide first impressions of trust","Neither. Both are simple fixes later on","Slow, since Google quietly removes slow sites"], why:"Nobody emails you about a slow site. They just tap back, and you never hear about the customer you lost."},
    {id:"q.p1.salesperson.a", c:["c.p1.salesperson"], q:"Picture your website as a salesperson greeting every visitor. What should a good one do, in order?", a:["Open fast, speak clearly, then prove it","Look impressive, sound busy, close hard","Greet warmly, chat a while, upsell everything","Collect an email, then follow up later"], why:"Speed to the door, a clear offer, proof it delivers: that's the whole job description."},
    {id:"q.p1.value-prop.a", c:["c.p1.value-prop"], q:"A windsurfer wants a homepage headline. Which one actually says what she sells and where?", a:["Custom windsurfing sails, built on Bonaire","Ride the wind, feel the freedom","Passion for performance drives everything we do","Welcome to our official company website"], why:"Clear beats clever, every time. Say what you sell, for whom."},
    {id:"q.p1.cta.a", c:["c.p1.cta"], q:"Your homepage has photos, story, everything, but no button telling people what to do next. What have you actually built?", a:["A pitch that never asks for the sale","A brochure, and that's perfectly fine","A safer bet, since pushing turns people off","A trust signal, showing you're not pushy"], why:"The call to action is the moment you ask for the sale. No ask, no sale."},
    {id:"q.p1.value-prop.b", c:["c.p1.value-prop"], q:"A rival business could paste your 'about us' paragraph onto their own site and nobody would notice. What does that tell you?", a:["It says nothing that's actually yours","It's too long for a homepage","It should mention a client by name","It needs one more specific number included"], why:"If a competitor could truthfully paste your sentence onto their site, it was never selling anything."},
    {id:"q.p1.friction.a", c:["c.p1.friction"], q:"Your visitor scrolls, squints, still can't tell which button does what. What does she do next?", a:["Taps back, since guessing takes effort","Reads every word twice to be sure","Emails you to ask what it means","Compares it carefully against three competitor sites first"], why:"Every unclear thing is a small tax. Strangers do not pay taxes for you."},
    {id:"q.p1.hero.a", c:["c.p1.hero"], q:"Someone lands on your homepage with one question in mind. What do they actually do with your words?", a:["Scan fast for the answer they need","Read every sentence carefully, start to finish","Compare your wording to three competitors first","Bookmark the page to read later tonight"], why:"They arrive with a question, glance for a few seconds, and either see the answer or leave."},
    {id:"q.p1.audit.a", c:["c.p1.audit"], use:"mastery", q:"A friend asks what you actually do when you 'audit' a website. What's the honest answer?", a:["Walk it like a customer, list what's costing her","Check every line of code carefully for hidden errors","Compare it to five competitor websites","Count how many pages it actually has"], why:"Speed, clarity, proof, in that order, with one line per problem and what it costs."},
    {id:"q.p1.choice-overload.a", c:["c.p1.choice-overload"], use:"mastery", q:"A service menu lists twelve options, all the same size, same weight. What happens to the visitor deciding?", a:["She closes the tab without picking any","She reads all twelve carefully first","She calls to ask which is cheapest","She picks whichever option is listed first"], why:"More options feels generous. It reads as work, and work gets put off forever."}
  ],
  translate: [
    {id:"t.p1.conversion.a", c:["c.p1.conversion"], setup:"A salon owner has never heard the word 'conversion'. Which explanation lands best?", a:["Ten people walk into your shop, one buys. Get two of ten, you doubled sales.","We optimize your conversion funnel to maximize visitor to customer throughput and revenue.","Conversion means turning site traffic into paying transactions using persuasive user experience design."], why:"The shop picture is felt in one second. The other two are heard and forgotten."},
    {id:"t.p1.salesperson.a", c:["c.p1.salesperson"], setup:"Explain what a website is for, with zero terminology.", a:["Picture a shop with a dusty window and a sticky door. We clean the window, oil the door.","A website is your digital storefront leveraging your brand presence across all channels.","A website is a twenty four seven omnichannel customer touchpoint across every single brand channel."], why:"The dusty window is instantly felt. Omnichannel touchpoint is instantly forgotten."},
    {id:"t.p1.proof.a", c:["c.p1.proof"], setup:"Explain social proof to someone who distrusts marketing talk.", a:["Two food stands sit side by side, one has a line. You join the line. Nobody told you to.","Social proof leverages herd psychology and social norms to reduce perceived risk in purchase decisions.","It's about building brand trust equity through client testimonials and reviews."], why:"The food stand line is proof explained by a human. The others sound like the marketers he already distrusts."},
    {id:"t.p1.fold.a", c:["c.p1.fold"], use:"mastery", setup:"Explain 'above the fold' to a shop owner who has never built a website.", a:["Everything they see before scrolling, like your window display, not the back room.","It's the visible viewport prior to any user scroll interaction occurring.","That's your primary above the fold real estate reserved for conversion optimization purposes."], why:"The window display lands instantly. The jargon versions explain nothing to someone who has never coded."}
  ],
  diagnose: [
    {id:"d.p1.conversion.a", c:["c.p1.conversion"], say:"'People visit my site but nobody books.'", a:["Conversion: speed, clarity or proof is broken","SEO: the site cannot be found by anyone searching","Branding: the logo needs updating"], why:"Visitors arriving means people can find you. Falling out between look and book is the money problem."},
    {id:"d.p1.credibility.a", c:["c.p1.credibility"], use:"mastery", say:"'Visitors tell me we look shady, even though we've been open for years.'", a:["Credibility: something reads as abandoned","SEO: the site needs a lot more backlinks","Pricing: your prices are set far too low"], why:"A copyright line stuck in some old year quietly tells every visitor the business might be gone."},
    {id:"d.p1.hero.a", c:["c.p1.hero"], use:"mastery", say:"'People land on my homepage and scroll straight past the top without pausing.'", a:["The hero: the first screen isn't selling","Analytics: you need better visitor tracking","Social media: you should post more often"], why:"The first screen is the whole shop window. If it doesn't sell, nothing below it gets read."}
  ]
},
{
  id: "p2", num: "P2", title: "Bottlenecks, Custom Software & AI", icon: "⚙️",
  read: "modules/reel-school-02.html",
  cards: [
    {t:"Bottleneck", d:"The narrowest point everything must pass through; sets the speed of the whole business.", s:"the point where everything gets stuck"},
    {t:"Workflow", d:"The steps a task goes through from start to done.", s:"how a job travels through your business"},
    {t:"Automation", d:"Software following fixed rules: when this happens, do that.", s:"the boring stuff happens by itself"},
    {t:"AI", d:"Software handling judgment-flavored tasks: reading, writing, sorting, answering.", s:"software that can read and write, not just follow rules"},
    {t:"Human in the loop", d:"The system prepares, a person approves. Control stays with the human.", s:"the machine does the legwork, you keep the yes"},
    {t:"Integration", d:"Two systems exchanging data automatically instead of via a human.", s:"your systems finally talk to each other"},
    {t:"API", d:"The official plug a system offers so other software can connect to it.", s:"the plug that lets systems connect"},
    {t:"Single source of truth", d:"One place where the real, current data lives; everything else reads from it.", s:"one list that is always right"},
    {t:"Off-the-shelf / SaaS", d:"Ready-made subscription software, one-size-fits-most, paid monthly forever.", s:"ready-made, rented, fits nobody perfectly"},
    {t:"Custom software", d:"Built for one business's exact way of working; owned, not rented.", s:"built around how you actually work"},
    {t:"Back office", d:"The internal screens where the team manages bookings, customers, money.", s:"the control room behind your website"},
    {t:"Dashboard", d:"One screen showing the state of the business at a glance.", s:"everything on one screen"},
    {t:"Process mapping", d:"Writing down the repeated tasks and steps a business runs on.", s:"we list what you repeat every day"},
    {t:"Quick win", d:"A small first automation delivered fast to prove value before bigger work.", s:"we fix one painful thing first, fast"},
    {t:"Scope", d:"The agreed edge of a project: what is in, what is out.", s:"exactly what we will build, on paper"},
    {t:"Manual entry", d:"A human typing data a machine already had. The root of double entry.", s:"typing the same thing twice"}
  ],
  quiz: [
    {q:"What is the phone test?", a:["Could you turn your phone off for two weeks without the business stopping?","Does your website load fast on a phone?","Do customers prefer calling or messaging you?","How many apps does the owner use?"], why:"If the business stops when the phone is off, the owner is the bottleneck."},
    {q:"What is the bottleneck bill formula?", a:["Hours per week × hourly value × 52","Revenue × 10%","Employees × salary × 2","Bookings × price"], why:"Ten hours a week at 50 an hour is 26,000 a year, every year, forever."},
    {q:"Automation first, AI second. Why?", a:["Most businesses need reliable rules, which are cheaper, before any judgment work","AI is illegal in most countries","Automation is newer technology","AI only works for large companies"], why:"Half the 'AI stories' owners hear are actually just rules. Rules are reliable and show wins in week one."},
    {q:"What is the 80 percent trap of off-the-shelf software?", a:["It does 80% of what you need, and the missing 20% is your money-making weird part","It only works 80% of the time","It costs 80% of custom","80% of businesses use it"], why:"So the owner bends the business around the tool, or duct-tapes the gap with WhatsApp and a spreadsheet."},
    {q:"The four signs of a bottleneck are double entry, the human router, no single source of truth, and...", a:["The 10 pm workload","The broken printer","The empty inbox","The unpaid invoice"], why:"Admin after closing is not dedication, it is a queue, and queues are bottleneck symptoms."},
    {q:"At Little John Scooters, what does the owner do with each booking request?", a:["Approves it with one tap on his phone","Types the confirmation email himself","Calls every customer back","Checks a paper agenda first"], why:"Human in the loop, live: the machine does the running around, the human keeps the decision."},
    {q:"When is off-the-shelf software honestly the right call?", a:["When the business process is completely standard","Never, custom always wins","Only for restaurants","When the owner is over 50"], why:"Custom is for businesses whose way of working IS the advantage. Saying this builds trust."},
    {q:"'A booking noted in WhatsApp, then the spreadsheet, then the invoice' is called...", a:["Double entry, and every copy is a chance for a mistake","Good record keeping","A backup strategy","An integration"], why:"Errors with money or dates cost real customers. That is the expensive part of manual work."},
    {q:"Why does 'you probably do not need AI yet' work so well as a message?", a:["Everyone else sells hype, so honesty makes you the trusted advisor","It lowers your prices","AI is actually useless","Clients prefer doing things by hand"], why:"The most trust-building sentence in your arsenal, precisely because it costs you a sale you did not want."},
    {q:"The duct-tape stage of a growing business is...", a:["WhatsApp, a spreadsheet, a notebook and the owner's memory","A phase only failing businesses hit","Something to be ashamed of","Solved by hiring more staff"], why:"Nobody chose it, it accumulated. It works at five customers a week and cracks at twenty-five."}
  ],
  translate: [
    {setup:"Explain 'bottleneck' with zero business jargon.", a:["Picture a five-lane highway squeezing into one toll booth. The booth sets everyone's speed. In your business, you are the booth.","Your throughput is constrained by a single point of failure in your operational pipeline.","It is a capacity limitation in your process architecture."], why:"The toll booth is felt in the stomach. 'Operational pipeline' is heard and forgotten."},
    {setup:"Explain automation versus AI at a kitchen table.", a:["Automation is a coffee machine: same button, same coffee, every time. AI is a quick young helper who can read your mail and draft replies, so you glance before anything goes out.","Automation is deterministic rule execution; AI is probabilistic inference.","Automation handles structured data, AI handles unstructured data."], why:"The coffee machine and the young helper carry the whole distinction without one technical word."},
    {setup:"A worried owner asks if the robot will talk nonsense to customers. Best answer?", a:["Nothing reaches a customer without your yes. Like a kitchen where the chef nods before any plate leaves the pass. You stay the chef.","Modern LLMs have low hallucination rates.","We use guardrails and evaluation frameworks."], why:"The chef's nod answers the fear, not the technology. The other answers feed the fear."}
  ],
  diagnose: [
    {say:"'I am drowning in admin, my evenings are gone.'", a:["A bottleneck: manual work a system should do","A marketing problem: needs more customers","A branding problem: needs a new logo"], why:"The 10 pm workload is a queue. Queues are bottleneck symptoms, and systems remove queues."},
    {say:"'We want to do something with AI.'", a:["Usually plain automation first; find the repeated task","Buy an AI subscription immediately","Build a chatbot for the homepage"], why:"The first question is never about AI. It is: what task do you repeat every single day?"},
    {say:"'Everything runs through me personally.'", a:["The owner is the bottleneck; phone test confirms it","The team needs motivation training","The prices are too low"], why:"Every booking, question and invoice squeezing through one person caps the whole business at that person's speed."}
  ]
},
{
  id: "m1", num: "M1", title: "Website Building", icon: "🏗️",
  read: "modules/academy-module-1.html",
  cards: [
    {t:"UX", d:"How easy it is for a visitor to do what they came for.", s:"how easy your site is to use"},
    {t:"UI", d:"The visible layer: buttons, screens, colors.", s:"what it looks and feels like"},
    {t:"SEO", d:"Earning a better spot in search results with words, trust and speed.", s:"being found when people search for what you sell"},
    {t:"Local SEO", d:"The Google map box: Business Profile, reviews, photos, hours.", s:"the map result with your reviews"},
    {t:"Responsive", d:"The site rearranges to work on every screen size.", s:"works perfectly on phones"},
    {t:"CMS", d:"The dashboard for editing content without a developer.", s:"you can update it yourself"},
    {t:"Domain", d:"The address: yourbusiness.com. Rented yearly, control matters.", s:"your address on the internet"},
    {t:"Hosting", d:"The computer where the site lives; quality drives speed and uptime.", s:"where your site lives"},
    {t:"Frontend", d:"Everything the visitor sees and touches.", s:"the part your customers see"},
    {t:"Backend", d:"The machinery: processing, storage, logic behind the screens.", s:"the machinery behind it"},
    {t:"HTTPS", d:"Encrypted connection; the padlock. Missing it triggers browser warnings.", s:"the padlock that says you are safe"},
    {t:"Analytics", d:"Measurement of visits, sources and behavior.", s:"knowing what visitors actually do"},
    {t:"Landing page", d:"A single page built for one audience and one action.", s:"one page, one goal"},
    {t:"Launch", d:"The moment the site goes live on the real domain.", s:"the day it goes live"}
  ],
  quiz: [
    {q:"The translation rule says every website term maps to one of three client cares. Which three?", a:["More customers, looking professional, less hassle","Speed, price, design","Traffic, content, code","SEO, ads, social"], why:"Decide the bucket first, lead with it, jargon second if at all."},
    {q:"What is the difference between UX and UI?", a:["UI is what it looks like, UX is how it works when a real person in a hurry uses it","They are the same thing","UX is for apps, UI is for websites","UI is the backend, UX is the frontend"], why:"A site can be beautiful and still fail UX. That was the whole point of the breakdown reel."},
    {q:"For a local restaurant, which SEO element usually pays most?", a:["The Google Business Profile: map, reviews, photos, hours","Blog posts about food history","Keyword density on the homepage","Backlinks from news sites"], why:"For local businesses the map box matters more than page position, and most owners never touched theirs."},
    {q:"'Number one on Google in two weeks, guaranteed' means the caller is...", a:["Lying, or doing something Google punishes later","A rare genius","Working directly for Google","Offering a fair deal worth testing"], why:"Nobody can guarantee rankings, not even Google staff. Saying so separates you from the cold-callers."},
    {q:"In the house metaphor: domain, hosting, CMS are...", a:["The address, the land, your own key to rearrange the furniture","The roof, the walls, the floor","The kitchen, the bathroom, the garage","The rent, the mortgage, the insurance"], why:"And the design is the facade. Four terms, one picture, whole machinery explained."},
    {q:"Why should the client always own their domain?", a:["Whoever controls the domain controls where visitors end up; otherwise it is a leash","Domains are expensive to transfer","It looks better legally","Google ranks owner-held domains higher"], why:"Many agencies register it under themselves and hold it hostage. Your policy is the opposite, out loud."},
    {q:"SEO is a garden, not a switch, because...", a:["It takes months to grow and it compounds","You need to water your server","It only works in summer","Google employees tend it manually"], why:"Anyone selling instant rankings is selling something that dies or gets punished."},
    {q:"A client asks 'can I update it myself?' They are asking for...", a:["A CMS","A new domain","Better hosting","An SSL certificate"], why:"They just do not know the word. Your job is knowing it for them."},
    {q:"Dutch and English on a tourist-island site matters because...", a:["Locals and visitors should each feel the site was made for them","Google requires two languages","It doubles the page count for SEO","English is more professional"], why:"Half-translated sites whisper 'you are the second-class customer' to whichever language got neglected."},
    {q:"The site should answer 'what people call you to ask'. Where does that list come from?", a:["The owner's own phone log: hours, prices, availability, parking","A competitor analysis","A keyword research tool","The web designer's imagination"], why:"A free content plan written by their own customers. Also proof your method starts from their reality."}
  ],
  translate: [
    {setup:"Explain SEO to someone who thinks it is a scam.", a:["Google is the phonebook now, and it puts the clearest, most useful businesses first. We make sure the phonebook understands what you sell and where you are. No magic.","We optimize your on-page signals and authority metrics.","SEO is about ranking algorithms and keyword strategy."], why:"The phonebook needs no trust in marketing, just in phonebooks. The others sound exactly like the scam he fears."},
    {setup:"Explain domain ownership with a picture, not a policy.", a:["Your website address is like the deed to your shop. Some builders keep the deed in their own drawer, and then you can never leave. We put the deed in your hands.","We follow industry-standard registrar practices with full credential handover.","You get admin rights on the DNS configuration."], why:"The deed in the drawer makes an abstract risk physically felt."},
    {setup:"Explain what a CMS gives the owner.", a:["Your own key to the shop window: price changes, new photos, done in a minute yourself, instead of calling the guy who built the window.","A headless content layer with an editing interface.","Full CRUD access to your content database."], why:"The key to your own shop window says freedom. CRUD says nothing to anyone normal."}
  ],
  diagnose: [
    {say:"'Nobody can find us online.'", a:["Findability: SEO, the Google profile, or simply no presence","Conversion: the site loses visitors","Systems: the booking flow is manual"], why:"No visitors arriving is a findability problem, and for local businesses the Google box is suspect number one."},
    {say:"'If I want one sentence changed on my site, I have to email a guy and wait two weeks.'", a:["No CMS and no ownership: the relationship with their own site is broken","Bad SEO strategy","They need a mobile app instead"], why:"'I have to go through someone' is the whole problem in one phrase. CMS plus ownership fixes it."}
  ]
},
{
  id: "m2", num: "M2", title: "Branding & Positioning", icon: "🧭",
  read: "modules/academy-module-2.html",
  cards: [
    {t:"Brand", d:"The sum of what people think and say about a business.", s:"what people say when you are not in the room"},
    {t:"Positioning", d:"The chosen slot in the customer's head: for whom, different how.", s:"the slot you own in people's heads"},
    {t:"Differentiator", d:"A claim competitors cannot truthfully copy.", s:"the thing only you can say"},
    {t:"Niche", d:"The deliberately narrowed audience or specialty.", s:"who you are really for"},
    {t:"Messaging", d:"The repeated core sentences: what, for whom, why you.", s:"the words you repeat everywhere"},
    {t:"Tone of voice", d:"The personality of the words: formal, warm, playful, direct.", s:"how your business sounds"},
    {t:"Visual identity", d:"The recognition system: logo, colors, type, photo style.", s:"your recognizable look"},
    {t:"Brand kit", d:"The rulebook for applying the identity consistently.", s:"the rulebook so everything matches"},
    {t:"Perceived value", d:"What people assume you cost before seeing the price.", s:"what you look like you cost"},
    {t:"Touchpoint", d:"Any place a customer meets the brand: site, socials, invoice, van.", s:"everywhere a customer meets you"},
    {t:"Rebrand", d:"Deliberately changing the positioning and identity, not just the logo.", s:"changing what you stand for, not just the logo"},
    {t:"Target audience", d:"The specific group the brand is built to attract.", s:"your ideal customer"}
  ],
  quiz: [
    {q:"Customers always haggling on price is a symptom of...", a:["A positioning problem: they look interchangeable","A price problem: too expensive","A website problem: too slow","A staffing problem"], why:"Interchangeable things get compared on price only. Nobody haggles with the specialist."},
    {q:"Why does 'for everyone' fail as positioning?", a:["Human memory stores one slot per business; 'for everyone' reads as 'nothing special'","It is illegal to exclude customers","Niches are always richer","Google penalizes broad websites"], why:"If you do not choose your slot, the market assigns you 'one of the others', the most expensive slot there is."},
    {q:"'Narrow the message, not the door' means...", a:["Be clearly for someone; everyone else still comes, on your terms","Close your shop to walk-ins","Only serve one customer type ever","Make the website smaller"], why:"The wedding photographer gets family shoots too. Being clearly for someone signals competence to all."},
    {q:"A differentiator must pass which test?", a:["The copy-paste test: a competitor could not truthfully claim it","The billboard test: it fits on a sign","The slogan test: it rhymes","The budget test: it costs under 1000"], why:"'Quality and service' fails for everyone. 'Every booking confirmed within a minute, day or night' passes."},
    {q:"The difference between a logo and a brand is...", a:["The logo is the flag, the brand is the country","They are the same","The logo is more important","The brand is just the color palette"], why:"Redesigning the flag does not change the country, which is why logo-only rebrands change nothing customers feel."},
    {q:"Why does consistency beat brilliance?", a:["Trust is built by repetition, and every inconsistency resets the counter","Brilliant designs are expensive","Customers dislike creativity","Consistency is easier to invoice"], why:"A decent identity applied everywhere outperforms a beautiful one applied randomly."},
    {q:"'People do not price-shop the specialist, they price-shop the...'", a:["generic","expensive","local","famous"], why:"When a business looks like every other, price is the only thing left to compare."},
    {q:"The sail maker's site is nearly empty: logo, one sentence, one contact button. Why does that work?", a:["Positioning as subtraction: a craft brand needs one unmistakable sentence, not ten pages","The builder ran out of time","Empty sites load faster for SEO","It saves hosting costs"], why:"Confidence is quiet. Insecurity is ten menu items."},
    {q:"Good messaging starts sentences with...", a:["The customer's situation, not with 'we'","The company mission","The founding year","An inspiring quote"], why:"'Your scooter is confirmed before you finish your coffee' beats 'we are passionate about quality'."},
    {q:"Raising perceived value instead of lowering prices is smart because...", a:["It is often cheaper and it compounds; discounts do neither","Customers never notice prices","Premium looks are free","Low prices are illegal in some markets"], why:"The label decides what people expect to pay before the offer is read."}
  ],
  translate: [
    {setup:"Explain positioning at a kitchen table.", a:["Five fruit stands on the market square, but everyone knows 'the one with the sweet mangoes'. People walk past four stands for it. Your business needs its mango.","Positioning is your differentiated place in the competitive landscape.","It is about owning mental real estate in your category."], why:"The mango stand is a story people retell. 'Mental real estate' is a phrase people escape from."},
    {setup:"Explain perceived value without saying 'perceived value'.", a:["Same wine, two labels: one beautiful, one a printed sticker. People pay more for the first and swear it tastes better. Your business has a label too.","Your price elasticity is influenced by presentation quality signals.","Premium aesthetics increase willingness-to-pay."], why:"The wine bottle does in ten seconds what the jargon versions never do."},
    {setup:"Explain why consistency matters, plainly.", a:["You trust your favorite bar because it feels the same every visit. Different music, prices and name each time, and you would stop going without knowing why.","Inconsistent touchpoints erode brand equity accumulation.","Consistency drives recognition metrics."], why:"The bar you would quietly stop visiting is consistency explained from the inside."}
  ],
  diagnose: [
    {say:"'People do not really get what we do.'", a:["Messaging: the words are vague, clever, or about themselves","Visual identity: the logo is weak","Systems: no booking flow"], why:"The offer needs to survive one plain sentence. If customers cannot repeat it, it does not exist."},
    {say:"'We look cheaper than we are.'", a:["Perceived value: the visuals discount the price before it is read","SEO: not enough keywords","Bottleneck: too much admin"], why:"Dated visuals write a discount on the label. Raising the look is pricing power."},
    {say:"'We look different everywhere: sign, site, Instagram.'", a:["Consistency: recognition never accumulates, trust never compounds","Positioning: wrong niche","Conversion: weak call to action"], why:"Three first impressions, zero compound interest. One system, applied everywhere, fixes it."},
    {say:"'We attract bargain hunters and the wrong kind of customers.'", a:["Positioning: the brand signals broadcast to everyone, so everyone shows up","Advertising: wrong ad budget","Hosting: site too slow"], why:"Broadcast to everyone and the bargain hunters answer loudest. Choose who it is for."}
  ]
}
];
