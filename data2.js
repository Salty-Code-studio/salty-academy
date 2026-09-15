// Salty Academy game data · part 2 (M3, M4, M5, M6)
window.ACADEMY_PART2 = [
{
  id: "m3", num: "M3", title: "Growth & Marketing", icon: "📈",
  read: "modules/academy-module-3.html",
  cards: [
    {id:"f.m3.funnel.a", c:["c.m3.funnel"], t:"Funnel", d:"The pipeline: strangers, visitors, leads, customers, each stage smaller.", s:"the path from stranger to customer"},
    {id:"f.m3.lead.a", c:["c.m3.lead"], t:"Lead", d:"A person who raised a hand and left a contact route.", s:"someone who raised their hand"},
    {id:"f.m3.lead-magnet.a", c:["c.m3.lead-magnet"], t:"Lead magnet", d:"Something useful given away to make hand-raising easy.", s:"a free useful thing that starts the conversation"},
    {id:"f.m3.organic.a", c:["c.m3.organic"], t:"Organic", d:"Unpaid reach: content, SEO, reviews, word of mouth. Compounds.", s:"the garden: slow, then it works while you sleep"},
    {id:"f.m3.paid.a", c:["c.m3.paid"], t:"Paid / ads", d:"Bought reach. Instant, adjustable, stops when you stop.", s:"the faucet: on when you pay, off when you stop"},
    {id:"f.m3.targeting.a", c:["c.m3.targeting"], t:"Targeting", d:"Choosing who sees an ad: place, age, interests, behavior.", s:"showing it only to the right people"},
    {id:"f.m3.creative.a", c:["c.m3.creative"], t:"Creative", d:"The ad itself: image or video plus words.", s:"the ad people actually see"},
    {id:"f.m3.remarketing.a", c:["c.m3.remarketing"], t:"Remarketing", d:"Ads shown only to previous visitors. Cheap and effective.", s:"the ads that follow you, working for you"},
    {id:"f.m3.conversion-rate.a", c:["c.m3.conversion-rate"], t:"Conversion rate", d:"The percentage that takes the step: visitors who book, leads who buy.", s:"how many lookers become bookers"},
    {id:"f.m3.reach.a", c:["c.m3.reach"], t:"Reach / impressions", d:"How many people saw it, and how many times in total.", s:"how many eyeballs"},
    {id:"f.m3.engagement.a", c:["c.m3.engagement"], t:"Engagement", d:"Interactions: likes, comments, shares, saves. Applause, not income.", s:"applause, which is nice, but applause"},
    {id:"f.m3.algorithm.a", c:["c.m3.algorithm"], t:"Algorithm", d:"The platform's sorting system deciding who sees what.", s:"the platform deciding who sees you"},
    {id:"f.m3.crm.a", c:["c.m3.crm"], t:"CRM", d:"The system holding every customer, lead and conversation.", s:"the memory of your business"},
    {id:"f.m3.acquisition.a", c:["c.m3.acquisition"], t:"Acquisition", d:"Everything spent gaining one new customer.", s:"what a new customer costs you"},
    {id:"f.m3.retention.a", c:["c.m3.retention"], t:"Retention", d:"Keeping and reselling to existing customers.", s:"keeping the ones you already won"}
  ],
  quiz: [
    {id:"q.m3.funnel.a", c:["c.m3.funnel"], q:"You're training a new hire on the pipeline: strangers, visitors, leads, then finally...", a:["Customers","Subscribers","Followers","Reviewers"], why:"Every tool you buy closes one specific gap between two of those stations, ideally ending with customers who return and bring friends."},
    {id:"q.m3.funnel.b", c:["c.m3.funnel"], q:"A boutique gets steady website visitors from Instagram, but almost nobody buys. What does she actually need first?", a:["Fix the leak on the site","Spend more on ads to compensate","A flashier logo up top","One more social platform to try"], why:"Ads amplify whatever exists on the other end, leak included. Patch the hole before pouring in more water."},
    {id:"q.m3.garden-faucet.a", c:["c.m3.garden-faucet","c.m3.organic","c.m3.paid"], q:"A friend asks you to explain organic versus paid marketing using one simple picture. You say...", a:["The garden and the faucet","The hammer and the nail","The boat and the anchor","The compass and the river map"], why:"Paid is the faucet: instant, and it stops the second you stop paying. Organic is the garden: slow, but it keeps growing on its own."},
    {id:"q.m3.lead.a", c:["c.m3.lead"], q:"Ten thousand people follow your page. Forty people DMed you their number this month. Which number actually runs your business?", a:["The forty: you can reach them","The ten thousand: reach wins","Both count exactly the same","Neither, only paying customers count"], why:"A lead is a raised hand with a way to reach them. You cannot personally message ten thousand strangers."},
    {id:"q.m3.lead-magnet.a", c:["c.m3.lead-magnet"], q:"A rental shop offers a free five minute site check in exchange for one DM. A skeptical friend asks if that's just clickbait. What's the honest test?", a:["Worth something either way","Just needs to collect an email","Tease enough to make them curious","Cost the business nothing at all"], why:"Generosity is the marketing. If it wouldn't be useful on its own, it is not a real lead magnet, it is bait."},
    {id:"q.m3.algorithm.a", c:["c.m3.algorithm","c.m3.crm"], q:"A friend brags about her ten thousand followers. You ask what happens if Instagram vanished tomorrow. She goes quiet. What's the honest lesson?", a:["Followers are rented, a list is owned","Followers matter more than any list","Instagram would never actually vanish","Follower count is the only real metric"], why:"The algorithm decides who sees a follower. Nobody decides who's on your own list but you."},
    {id:"q.m3.paid.a", c:["c.m3.paid"], q:"A client tried Facebook ads for exactly one week, spent 50 euros, got nothing, and swears ads don't work. What actually happened?", a:["The ads never got time to learn","Facebook ads never work for small shops","The platform quietly kept the budget","She used the wrong kind of card"], why:"Ads need learning time, and they amplify whatever page they land on, including broken ones."},
    {id:"q.m3.crm.a", c:["c.m3.crm"], q:"You look for your business's list of past customers to send a quick thank you message. There isn't one. What's actually missing?", a:["A CRM: the business's memory","A CMS to edit the site","A bigger marketing budget","A dedicated social media manager"], why:"A CRM holds every customer and conversation in one place, so remembering someone isn't one person's job to forget."},
    {id:"q.m3.retention.a", c:["c.m3.retention"], q:"A gym signs up forty new members every January and quietly loses half of last year's by March. What's the actual pattern here?", a:["A forgetting-customers problem","Simply not enough new members joining","A pricing problem that needs fixing","A staffing problem during busy season"], why:"Most businesses aren't short on new customers. They're short on remembering and keeping the ones they already won."},
    {id:"q.m3.targeting.a", c:["c.m3.targeting"], use:"mastery", q:"A windsurf school runs one ad shown to literally everyone in the whole country, tourists and landlocked office workers alike. What's the costly mistake?", a:["Bad targeting, wrong people","The creative isn't exciting enough","Not enough money behind the ad","The wrong social platform entirely"], why:"Targeting means the ad only shows to people who could plausibly say yes. Reach everyone and you mostly pay to be ignored."}
  ],
  translate: [
    {id:"t.m3.funnel.a", c:["c.m3.funnel"], setup:"Explain the funnel without saying 'funnel'.", a:["A bucket with a hole, carried tap to garden. Patch the hole, don't add more water.","We analyze your full-funnel conversion metrics.","It is the customer journey from awareness to purchase."], why:"The leaking bucket makes 'find the leak first' unforgettable."},
    {id:"t.m3.garden-faucet.a", c:["c.m3.garden-faucet","c.m3.organic","c.m3.paid"], setup:"Explain ads versus content to a skeptical restaurant owner.", a:["A guy shouting on the corner stops when you stop paying him. Content is your reputation, always on.","Paid media delivers immediate reach while organic builds compounding equity.","We recommend a 70/30 paid-organic split."], why:"The shouting guy and the reputation need no marketing degree, and the skeptic keeps his guard down."},
    {id:"t.m3.remarketing.a", c:["c.m3.remarketing"], use:"mastery", setup:"Explain remarketing to someone who finds those ads creepy.", a:["Someone eyes a shirt and leaves. Remarketing taps the shoulder later, only for people who already looked.","Retargeting pixels track user sessions for behavioral advertising.","It is cookie-based audience segmentation."], why:"The tap on the shoulder turns creepy into considerate, and pixels-and-cookies turns considerate back into creepy."}
  ],
  diagnose: [
    {id:"d.m3.engagement.a", c:["c.m3.engagement","c.m3.funnel"], say:"'I post every day and get nothing from it.'", a:["Applause content, or a leak somewhere","Just not using enough hashtags lately","The algorithm has it out for you today"], why:"Content works when it teaches something useful and ends with one small step, and someone answers fast when a hand goes up."},
    {id:"d.m3.retention.a", c:["c.m3.retention"], use:"mastery", say:"'We are packed in season and dead the rest of the year.'", a:["Retention: never captured before","More ads during the dead months","A cheaper menu for the off season"], why:"The gold is already in the house: the people who loved it and were never asked for a way to reach them."},
    {id:"d.m3.lead.a", c:["c.m3.lead"], say:"'Leads message us and then go quiet.'", a:["Follow-up: too slow, no system","The website loads too slowly","The logo does not inspire trust"], why:"The lead who messaged Tuesday and heard back Friday bought elsewhere Wednesday."},
    {id:"d.m3.conversion-rate.a", c:["c.m3.conversion-rate"], use:"mastery", say:"'We got twice as many visitors this month after boosting posts, but bookings barely moved.'", a:["Conversion: not converting visitors","Just needs an even bigger ad budget","The boosted posts reached the wrong app"], why:"More traffic without a better conversion rate just means more people leaving unconvinced, faster."}
  ]
},
{
  id: "m4", num: "M4", title: "AI & Education", icon: "🤖",
  read: "modules/academy-module-4.html",
  cards: [
    {t:"AI", d:"Software handling judgment-flavored tasks: reading, writing, sorting, deciding.", s:"software that can read and write, not just follow rules"},
    {t:"LLM / model", d:"The engine: software trained on huge amounts of text to continue any text sensibly.", s:"the engine that has read almost everything"},
    {t:"ChatGPT / Claude / Gemini", d:"Brands of models from different companies. Same kind of machine.", s:"brands, like car brands, the setup matters more"},
    {t:"Prompt", d:"The instruction given to the AI. Quality in, quality out.", s:"the briefing you give it"},
    {t:"Context", d:"What the model can see right now: the conversation and whatever you fed it.", s:"its short-term memory"},
    {t:"Hallucination", d:"Confident false statements, produced because plausible is not true.", s:"nonsense, said with confidence"},
    {t:"Chatbot", d:"Chat-window AI that answers questions and does nothing else.", s:"a receptionist that can only talk"},
    {t:"Assistant", d:"AI that performs tasks on request, one at a time.", s:"does the task when you ask"},
    {t:"Agent", d:"AI that takes steps and uses tools toward a goal, then presents the result.", s:"it does the legwork and brings you the result"},
    {t:"AI workflow", d:"A fixed chain where AI handles some steps and rules handle the rest.", s:"an assembly line with AI at some stations"},
    {t:"Human in the loop", d:"Design where a person approves before anything goes out. The pro standard.", s:"the machine prepares, you keep the yes"},
    {t:"Grounding", d:"Connecting AI to the business's real data so answers come from facts.", s:"giving it your real prices and rules to quote from"},
    {t:"Training", d:"How a model learned: patterns from massive text, fixed at build time.", s:"what it learned in school, before it met you"}
  ],
  quiz: [
    {q:"The one-line mental model for AI is...", a:["A very fast, well-read junior employee with infinite patience and no judgment of its own","A digital brain that thinks like a human","A search engine with personality","An expensive toy for tech companies"], why:"You do not marvel at it. You manage it: clear instructions, review before anything ships."},
    {q:"'Will AI replace my staff?' The fast-junior model answers...", a:["You do not fire a team because a junior joined; you stop paying seniors to do junior work","Yes, within two years","No, AI cannot do any real work","Only in large corporations"], why:"The picture answers the fear before the technology is even discussed."},
    {q:"Why does 'just use ChatGPT' disappoint businesses?", a:["It knows the world, not their business: no prices, no tone, no rules","ChatGPT is too expensive","It only speaks English","It refuses commercial questions"], why:"Making AI useful is mostly feeding it the business's context. That gap is where your service lives."},
    {q:"The best prompting rule is...", a:["Show, do not describe: two real examples beat every adjective","Use magic keywords","Always write in capital letters","Keep prompts under ten words"], why:"'Write in our tone' does little; pasting two examples of how the business writes does everything."},
    {q:"The ladder, bottom to top:", a:["Chatbot, assistant, agent, workflow","Workflow, chatbot, agent, assistant","Assistant, chatbot, workflow, agent","Agent, assistant, chatbot, workflow"], why:"Talks; does a task on request; takes steps with tools; a chain where AI mans some stations."},
    {q:"A hallucination happens because...", a:["The machine continues text plausibly, and plausible is not the same as true","The model is overheating","Users type too fast","The internet connection dropped"], why:"It does not know it is wrong. Every real system is designed around this fact, not in denial of it."},
    {q:"The three design answers to hallucination are: human on the yes, grounding in real data, and...", a:["Permission to say 'I do not know, a colleague will answer'","A bigger model","A legal disclaimer","Turning the AI off at night"], why:"The 'I do not know' permission sounds small and does the most."},
    {q:"Being loudly honest about AI's limits is smart because...", a:["The hype sellers hide the fine print, so honesty makes you the trusted advisor","It lowers expectations so you can underdeliver","Clients enjoy pessimism","It is required by law"], why:"Every honest limitation named on camera buys more trust than three promises."},
    {q:"The grown-up answer to 'is my data safe with AI?' includes...", a:["Business terms exist where data is not used for training; the real risk is staff pasting customer data into random free tools","Nothing is ever safe, avoid AI","AI companies cannot see any data","Only paper records are safe"], why:"The fix is a policy and picked tools instead of a quiet free-for-all, and setting that up is a service."},
    {q:"'Never sell AI, sell the...'", a:["Tuesday afternoon it gives back","subscription","future","algorithm"], why:"Nobody wants an AI implementation. Everybody wants the quote written in four minutes and the inbox that sorts itself."}
  ],
  translate: [
    {setup:"Explain what an LLM is at a kitchen table.", a:["A helper who has read every book in the library and types faster than anyone alive, but started at your company this morning. Brilliant, eager, needs onboarding.","A large language model trained on internet-scale text corpora.","A neural network that predicts the next token."], why:"The new-this-morning helper explains both the brilliance and the blind spots in one image."},
    {setup:"Explain an agent versus a chatbot, plainly.", a:["A chatbot is reception: it can only talk. An agent is a runner: 'sort out Mrs. Jansen's booking' and they check the agenda, prepare the confirmation, and put it on your desk to sign.","An agent has tool-use capabilities and multi-step reasoning.","Agents are autonomous, chatbots are reactive."], why:"The runner with the paper for your signature carries the whole ladder, including who stays in charge."},
    {setup:"Explain hallucination to a nervous client.", a:["You know that friend who never says 'I do not know' and answers confidently anyway? AI is that friend. So we built in the double-check before anything reaches your customers.","Models exhibit confabulation under distributional shift.","Hallucination rates are below 5% on benchmarks."], why:"Everyone has that friend. Nobody has a distributional shift."}
  ],
  diagnose: [
    {say:"'We tried ChatGPT and the answers were too generic.'", a:["No setup: the world's best-read junior got zero onboarding. Ground it in their prices, tone and rules","The model is too small, buy a bigger one","AI simply does not fit their industry"], why:"Generic in, generic out. Their failed experiment is your setup pitch, without criticizing anything."},
    {say:"'My customers will hate talking to a robot.'", a:["They hate bad robots that pretend to be human: let AI do the instant answers, hand the rest to a person honestly","They are right, never use AI with customers","Customers cannot tell the difference anyway"], why:"Fast and correct is what customers want, and a well-designed setup delivers more of both."},
    {say:"'Someone on my team is probably already pasting things into free AI tools.'", a:["Shadow AI: make it deliberate and safe with a policy and picked tools","Fire the employee","Block the internet at work"], why:"It is already happening, unmanaged, with customer data. Governance beats prohibition, and it is a service."}
  ]
},
{
  id: "m5", num: "M5", title: "Systems & Software", icon: "🗄️",
  read: "modules/academy-module-5.html",
  cards: [
    {t:"Database", d:"The structured filing cabinet where all business data lives, with rules enforced.", s:"one list that is always right"},
    {t:"Backend", d:"The rules layer: what happens when a booking, payment or date event fires.", s:"the machinery behind the screens"},
    {t:"Frontend", d:"The screens: customer site and team dashboard.", s:"everything people actually see and touch"},
    {t:"API", d:"The official plug a system offers so other software can talk to it.", s:"the plug that lets systems connect"},
    {t:"Webhook", d:"The doorbell: a system pings yours the instant something happens.", s:"the doorbell between systems"},
    {t:"Integration", d:"A finished bridge: two systems exchanging data with no human messenger.", s:"your tools finally talk to each other"},
    {t:"Dashboard", d:"A glanceable screen showing the state of the business.", s:"everything on one screen"},
    {t:"Back office", d:"The internal screens where the team runs the operation.", s:"the control room behind your website"},
    {t:"Internal tool", d:"Software only the team sees; customers never touch it.", s:"software just for your team"},
    {t:"Booking engine", d:"The availability-request-approval core of a reservation system.", s:"the part that knows what is free and takes the ask"},
    {t:"Sync / real-time", d:"All screens reflecting the same data at the same moment.", s:"everyone sees the same thing, instantly"},
    {t:"Migration", d:"Moving data from an old system to a new one without losing history.", s:"a careful move, nothing gets left behind"},
    {t:"Uptime", d:"The share of time a system is running. Monitored, not hoped.", s:"how often it is simply working"},
    {t:"Backup", d:"Automatic copies of the data, so one bad day cannot erase the memory.", s:"a spare copy of everything, made automatically"},
    {t:"Access / permissions", d:"Who can log in and what each person is allowed to do.", s:"the right keys for the right people"},
    {t:"The cloud", d:"Software and data running on professional servers you reach via the internet.", s:"it lives on professional computers, not under the counter"}
  ],
  quiz: [
    {q:"Every business system is three layers:", a:["A place data lives, rules that move it, screens people touch","Hardware, software, internet","Input, output, storage","Website, app, spreadsheet"], why:"Database, backend, frontend. Every tool, wish or problem lands in one of the three boxes."},
    {q:"A double booking is never bad luck. It is...", a:["Two lists disagreeing about one scooter","A customer's mistake","A staff training issue","A pricing problem"], why:"The fix is not being more careful, it is one list that everything reads from."},
    {q:"A spreadsheet versus a database:", a:["A spreadsheet trusts humans to type carefully; a database enforces the rules","They are identical","Databases are just bigger spreadsheets","Spreadsheets are more secure"], why:"A booking must have a date, and the same scooter cannot be in two drawers at once: enforced, not hoped."},
    {q:"An API is the plug. A webhook is...", a:["The doorbell: the system rings you the moment something happens","The cable","The socket","The fuse box"], why:"The difference between refreshing your mail and getting a push notification."},
    {q:"The five organs of a booking system are availability, the request, the approval, the notifications, and...", a:["The back office","The newsletter","The blog","The payment terminal"], why:"Miss an organ and a human is quietly doing that organ's job by hand."},
    {q:"The three grown-up questions to ask any software builder:", a:["What if it breaks, where do backups live, what happens if we part ways","How fast, how cheap, how soon","Which language, which framework, which cloud","Do you have references, a portfolio, a diploma"], why:"If any answer is vague, walk. Yours are: I know before you do, automatic and daily, everything is yours in writing."},
    {q:"'Custom does not have to mean experimental' because...", a:["A shared, proven core can be battle-tested in one business before reaching yours","All code is the same anyway","Experiments are actually good","Custom software never breaks"], why:"One engine, two live rental businesses on two islands: it came pre-broken-in."},
    {q:"When is Excel honestly good enough?", a:["Until two people edit at once or one typo can double-book a Saturday","Never","Always, databases are overkill","Only for businesses under five employees"], why:"The question is not Excel versus fancy, it is how expensive is your next typo."},
    {q:"Why is the cloud usually safer than the owner's own computer?", a:["Guarded data centers and continuous copies versus no security team and a machine that can be stolen","It is not, local is always safer","The cloud is magic","Cloud companies never have outages"], why:"The honest risks are weak passwords and shared logins, fixable in an afternoon."},
    {q:"'How do you know a payment arrived before handing over the keys?' The systems answer is...", a:["The doorbell: payment tells the booking, the booking tells you","Trust the customer","Check the bank app every hour","Ask for cash only"], why:"What they hear is: never that stomach-drop feeling again."}
  ],
  translate: [
    {setup:"Explain single source of truth at a kitchen table.", a:["A family where mom, dad and grandma each keep their own agenda: someone is showing up to the wrong birthday. We give the whole family one agenda on the fridge.","We centralize your data model in one canonical store.","It is a normalized database architecture."], why:"The family with three agendas is every business with three lists, instantly recognized."},
    {setup:"Explain an integration, plainly.", a:["Right now you are the messenger between your own systems: read it here, type it there. Connecting them means the machines pass the note themselves. You retire as the messenger.","We implement bidirectional data synchronization via REST APIs.","Systems interoperate through webhook-driven event flows."], why:"Retiring as the messenger is a promotion everyone understands."},
    {setup:"A nervous client fears losing history when switching systems. Best answer?", a:["It is a house move with professional movers: everything boxed, labeled, checked off at the new place. You do not lose the photo albums because you moved.","Our ETL pipeline preserves referential integrity.","We do a phased data migration with rollback capability."], why:"The photo albums answer the actual fear. The pipelines answer a question nobody asked."}
  ],
  diagnose: [
    {say:"'We double-booked again last weekend.'", a:["No single source of truth: lists disagreeing","Staff carelessness: needs discipline","Marketing: too many customers"], why:"Two lists eventually always disagree. One list that everything reads from is the structural fix."},
    {say:"'Only I can see the agenda, it is on my phone.'", a:["The operation is trapped in one device: every question routes through one person","Perfectly fine setup for a small business","A phone upgrade problem"], why:"Pack 02's bottleneck wearing systems clothes. The two-week holiday question confirms it."},
    {say:"'If my laptop died tonight... honestly, everything would be gone.'", a:["No backups: the cheapest insurance in the business is missing","Buy a better laptop","Print everything weekly"], why:"Never scare, always relieve: the fix costs almost nothing and takes an afternoon."}
  ]
},
{
  id: "m6", num: "M6", title: "The Sales Arena", icon: "🎯",
  read: "modules/academy-module-6.html",
  cards: [
    {t:"The conversation spine", d:"Listen, dig, diagnose, translate, recommend, close-lite. Mostly listening.", s:"six moves, in order, mostly listening"},
    {t:"The two-thirds ratio", d:"The prospect talks about two thirds of the time in good discovery.", s:"if you are explaining before asking four questions, you are pitching"},
    {t:"Insider question", d:"A question about a moment only insiders know exists. Proof no slide can match.", s:"asking about the late return proves you have stood there"},
    {t:"The Tuesday move", d:"When an answer is vague, ask what it looks like on a normal Tuesday.", s:"the truth lives in the boring Tuesday"},
    {t:"Honest normalization", d:"'You are not the exception, we see this in almost every business.' Only when true.", s:"shame closes people, normalcy opens them"},
    {t:"Reflect before recommend", d:"Repeat their worst moments back in their words before proposing anything.", s:"feeling understood comes before feeling helped"},
    {t:"One recommendation", d:"Not a menu. The smallest move that fixes the biggest leak.", s:"you were hired to have an opinion"},
    {t:"Close-lite", d:"A concrete small next step with a date. Never 'think about it'.", s:"I will send the audit Thursday"},
    {t:"Situation-turn-takeaway", d:"The 30-second story shape, always ending with a handback question.", s:"...does any of that sound like your evenings?"}
  ],
  quiz: [
    {q:"The six moves of the conversation spine, in order:", a:["Listen, dig, diagnose, translate, recommend, close-lite","Pitch, demo, discount, close, upsell, refer","Ask, tell, ask, tell, ask, close","Research, present, negotiate, sign, deliver, invoice"], why:"Mostly listening. The stated problem and the real problem differ about half the time."},
    {q:"In good discovery, the prospect talks...", a:["About two thirds of the time","About half the time","As little as possible","Only when asked yes/no questions"], why:"Pitches get price-shopped. Diagnoses get hired."},
    {q:"Why never name a technology before naming the problem?", a:["'You need a CRM' is pitching; the diagnosis first makes the same advice advising","Technologies scare clients","It is rude to use product names","Problems are easier to spell"], why:"Same content, opposite trust."},
    {q:"Why one recommendation instead of a menu?", a:["A menu makes the prospect the expert, which they are not, so they freeze","Menus are for restaurants","More options means more revenue","It shortens the meeting"], why:"Smallest move, biggest leak, one clear reason. You were hired to have an opinion."},
    {q:"What makes a question 'contain proof'?", a:["It names a painful, specific moment only insiders know exists","It includes a statistic","It mentions a famous client","It is very long"], why:"'Late return, next renter at the counter' proves you have stood where they stand. No slide can do that."},
    {q:"After asking an insider question, you should...", a:["Be quiet: the prospect fills the silence with their story, which is your brief","Answer it yourself to show expertise","Immediately ask the next question","Take notes out loud"], why:"An insider question answered by you is just a pitch again."},
    {q:"The story rules include: one story per conversation, only numbers you can stand behind, and...", a:["End with a question, never with the moral","Always name the client","Save it for the very end","Make it at least two minutes"], why:"'Sound familiar?' turns your proof into their story, and the conversation keeps belonging to them."},
    {q:"'You are not the exception, we see this everywhere' works because...", a:["Shame closes people, normalcy opens them, and it is only said when true","It flatters the prospect","It lowers their expectations","It fills awkward silence"], why:"Honest normalization: the confession becomes safe, and the conversation goes deeper."},
    {q:"Sometimes the honest diagnosis is one you do not sell. Then you...", a:["Say so, point them to who does, and win the referral machine","Sell them a website anyway","End the meeting quickly","Offer a discount instead"], why:"'I do not want your money for a website that will not fix this' loses one small deal and wins a reputation."},
    {q:"Every conversation ends with...", a:["A concrete next step with a date: 'I will send X by Thursday'","'Think about it and let me know'","A discount offer","A handshake and hope"], why:"Momentum is a deliverable. Fog is where brilliant conversations go to die."}
  ],
  translate: [
    {setup:"Which opener is the insider question?", a:["When someone returns the scooter late and the next renter is standing there, what happens?","Do you have any challenges with your booking process?","Would you say operational efficiency is a priority for you this quarter?"], why:"The first names a moment only operators know. The others are generic discovery that caps trust and Arena scores alike."},
    {setup:"The prospect gave a vague answer: 'oh, bookings mostly go fine.' Your move?", a:["What does 'mostly' look like on a normal Tuesday?","Great, then let us talk about your website.","Statistics show 40% of rentals lose bookings to slow replies."], why:"Send vague answers to Tuesday. Owners describe ideals and exceptions; the truth lives in the boring Tuesday."},
    {setup:"You just heard their chaos story. Before recommending, you...", a:["Reflect it back: 'so every request runs through your phone, evenings go to admin, and the double booking in May still stings.'","Present your three-tier pricing.","Tell them about another client with worse problems."], why:"Feeling understood comes before feeling helped, always, and cannot be skipped."}
  ],
  diagnose: [
    {say:"'Nobody can find us online.'", a:["Findability: Module 1 territory","Conversion: Pack 01 territory","Follow-up: Module 3 territory"], why:"SEO, the Google profile, or simply no presence. Check the map box first for a local business."},
    {say:"'We get visitors but no bookings.'", a:["Conversion: Pack 01 territory","Findability: Module 1 territory","AI: Module 4 territory"], why:"Speed, clarity or proof is failing. Run the five second test together."},
    {say:"'Customers always haggle on price.'", a:["Positioning: Module 2 territory","Systems: Module 5 territory","Ads: Module 3 territory"], why:"They look interchangeable. Nobody haggles with the specialist."},
    {say:"'I post constantly and nothing happens.'", a:["Pipeline: Module 3 territory","Branding: Module 2 territory","Bottleneck: Pack 02 territory"], why:"Applause content, or a leak further down. Follow the pipeline."},
    {say:"'I am drowning in admin.'", a:["Bottleneck: Pack 02 and Module 5 territory","Messaging: Module 2 territory","SEO: Module 1 territory"], why:"Manual work a system should do. Do the bottleneck bill math with their numbers."},
    {say:"'We should do something with AI.'", a:["Usually rules first: Pack 02 and Module 4 territory","Definitely an AI agent: build one immediately","A website redesign"], why:"Find the repeated task first. Half of what owners call AI is plain automation."},
    {say:"'We double-booked again last weekend.'", a:["Single source of truth: Module 5 territory","Staff discipline problem","Marketing success problem"], why:"Two lists disagreeing. One list, everything reads from it."},
    {say:"'People pick the big agency down the street.'", a:["Perceived weight: Module 2 territory, give people something to remember","Price: undercut the agency","Luck: keep trying"], why:"The big agency wins on familiar, not on better. Positioning and proof close that gap."}
  ]
}
];
