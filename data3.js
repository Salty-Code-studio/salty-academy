// Salty Academy game data · part 3: module ideas + speaking practice (Talk from Three)
// idea: the one sentence to hold on to, shown before quiz and boss rounds.
// speak: {prompt, words[3], points[]} — speak out loud ~30s, then reveal points, self-grade.
window.ACADEMY_EXTRAS = {
  p1: {
    idea: "A website is a salesperson. Its job: open the door fast, make the offer clear, and prove it can be trusted.",
    speak: [
      {id:"s.p1.salesperson.a", c:["c.p1.salesperson","c.p1.cta","c.p1.proof"], prompt:"What is a website for?", words:["Clarity","Trust","Next step"], points:[
        "It is your hardest working salesperson, on duty every hour of every day.",
        "Visitors scan, they do not read: they decide in seconds.",
        "One headline that says what you sell, one action impossible to miss.",
        "Proof up front: real reviews, real work, real names."]},
      {id:"s.p1.five-second.b", c:["c.p1.five-second","c.p1.friction"], prompt:"Explain the five second test", words:["Show","Ask","Gone"], points:[
        "Show anyone a homepage for five seconds, then take it away.",
        "Three questions: what do they sell, who is it for, what do I do next?",
        "Miss one answer and a real visitor is already gone.",
        "Guessing is effort, and the back button is free."]},
      {id:"s.p1.speed.c", c:["c.p1.speed","c.p1.bounce"], prompt:"Why speed is money", words:["Blank","Silence","Gone"], points:[
        "Three seconds of blank screen feels identical to 'this site is down'.",
        "Google measured it: past three seconds, more than half of mobile visitors leave.",
        "Slow sites get silence, not complaints: you never hear about the lost customers.",
        "The causes are boring: huge photos, bloated themes, cheap faraway hosting."]},
      {id:"s.p1.proof.b", c:["c.p1.proof","c.p1.value-prop"], prompt:"Proof beats promises", words:["Line","Evidence","Names"], points:[
        "Two food stands, one has a line: you join the line. Nobody told you to.",
        "The copy-paste test: if a competitor could paste your sentence, it proves nothing.",
        "Real photos, real numbers, real client names pass. Slogans never do.",
        "Never fake it: fake proof reads as fake instantly."]}
    ]
  },
  p2: {
    idea: "Nobody buys software. They buy their evenings back: find the bottleneck, remove it.",
    speak: [
      {id:"s.p2.phone-test.a", c:["c.p2.phone-test","c.p2.bottleneck"], prompt:"The phone test", words:["Phone","Stuck","Evenings"], points:[
        "Could you turn your phone off for two weeks without the business stopping?",
        "If not, you are the bottleneck: every booking and question squeezes through you.",
        "That is not dedication, it is a queue, and queues have a yearly bill.",
        "The fix is not working harder, it is moving repeated work into a system."]},
      {id:"s.p2.automation.a", c:["c.p2.automation"], prompt:"Automation versus AI", words:["Rules","Judgment","Order"], points:[
        "Automation is rules: when a booking confirms, send the email. Reliable, boring, valuable.",
        "AI is judgment: reading, writing, sorting, answering.",
        "Rules first, AI second: most businesses need the rules, cheaper and reliable.",
        "Half the AI stories owners hear are actually just rules."]},
      {id:"s.p2.human-loop.a", c:["c.p2.human-loop","c.p2.automation"], prompt:"One tap on Bonaire", words:["Chaos","Turn","Calm"], points:[
        "A scooter rental where every request, confirmation and reminder ran through the owner.",
        "Now customers request online and the booking lands on his phone: one tap approves.",
        "Emails send themselves, in his own branding.",
        "He did not lose control, he lost the running around."]},
      {id:"s.p2.bottleneck-bill.a", c:["c.p2.bottleneck-bill","c.p2.bottleneck"], prompt:"The bottleneck bill", words:["Hours","Rate","52"], points:[
        "Hours per week on a repeated task, times what an hour is worth, times 52 weeks.",
        "Ten hours a week at fifty an hour is 26,000 a year, every year.",
        "Do the math live with the client's own numbers, and round down.",
        "Nobody argues with their own numbers."]}
    ]
  },
  m1: {
    idea: "Every website term maps to one of three things a client cares about: more customers, looking professional, less hassle.",
    speak: [
      {id:"s.m1.seo.a", c:["c.m1.seo","c.m1.local-seo"], prompt:"SEO without the fear", words:["Phonebook","Words","Reviews"], points:[
        "Google is the phonebook now, and it puts the clearest, most useful businesses first.",
        "Your site must say what you sell in the words customers search with.",
        "For local businesses the map box pays most: reviews, photos, opening hours.",
        "Anyone guaranteeing number one on Google is lying, and you can happily say so."]},
      {id:"s.m1.domain.a", c:["c.m1.domain"], prompt:"Who owns your domain?", words:["Deed","Drawer","Keys"], points:[
        "Your web address is the deed to your shop.",
        "Some builders keep the deed in their own drawer, and then you can never leave.",
        "Check tonight: if your domain is not in your name, fix that before anything else.",
        "Our policy: you own the domain, the accounts and the data. Always."]},
      {id:"s.m1.domain.b", c:["c.m1.domain","c.m1.hosting","c.m1.cms"], prompt:"The house metaphor", words:["Address","Land","Key"], points:[
        "The domain is the address, hosting is the land the site lives on.",
        "The design is the facade, the backend is the machinery inside.",
        "The CMS is your own key: change prices and photos yourself in a minute.",
        "No more calling the builder to fix a typo."]}
    ]
  },
  m2: {
    idea: "Your brand is the slot you own in a customer's head. If you do not choose it, the market assigns you one.",
    speak: [
      {id:"s.m2.positioning.a", c:["c.m2.positioning","c.m2.brand"], prompt:"The mango stand", words:["Slot","Mango","Chosen"], points:[
        "Five fruit stands, but everyone knows the one with the sweet mangoes.",
        "People walk past four stands for it: being for someone beats being for everyone.",
        "Memory stores one slot per business; unclaimed slots default to 'one of the others'.",
        "'One of the others' competes on price only."]},
      {id:"s.m2.diagnosis-map.a", c:["c.m2.diagnosis-map","c.m2.positioning"], prompt:"Why customers haggle", words:["Interchangeable","Specialist","Price"], points:[
        "When a business looks like every other, price is the only thing left to compare.",
        "Nobody haggles with the specialist.",
        "Haggling is not a price problem, it is a positioning problem.",
        "Fix what makes you different, and the haggling quiets down."]},
      {id:"s.m2.perceived-value.a", c:["c.m2.perceived-value"], prompt:"The wine label", words:["Label","Expect","Power"], points:[
        "Same wine, two labels: people pay more for the beautiful one and swear it tastes better.",
        "Customers decide what you probably cost before you tell them.",
        "Looking premium is not vanity, it is pricing power.",
        "Raising perceived value is cheaper than lowering prices, and it compounds."]}
    ]
  },
  m3: {
    idea: "Marketing is a pipeline: strangers, visitors, leads, customers. Find the leak before spending a euro.",
    speak: [
      {id:"s.m3.funnel.a", c:["c.m3.funnel"], prompt:"The leaking bucket", words:["Water","Hole","Patch"], points:[
        "Marketing money is water carried in a bucket from the tap to the garden.",
        "If the bucket leaks, the answer is not more water, it is patching the hole.",
        "Lots of visitors but no bookings? The leak is the website, not the ads.",
        "Nobody has heard of you? That is a reach problem, a different fix."]},
      {id:"s.m3.garden-faucet.a", c:["c.m3.garden-faucet","c.m3.organic","c.m3.paid"], prompt:"Garden and faucet", words:["Ads","Content","Compound"], points:[
        "Ads are a faucet: instant flow, stops the second you stop paying.",
        "Content, reviews and SEO are a garden: slow, then working while you sleep.",
        "Most businesses need the faucet while the garden grows.",
        "Almost nobody needs only the faucet, forever."]},
      {id:"s.m3.algorithm.a", c:["c.m3.algorithm","c.m3.crm"], prompt:"Followers versus the list", words:["Rented","Owned","Reach"], points:[
        "Followers are rented: the platform owns them and the algorithm decides.",
        "An email or phone list is owned: nobody can take it away.",
        "If Instagram vanished tomorrow, who could you still reach?",
        "That answer is the real size of your audience."]}
    ]
  },
  m4: {
    idea: "AI is a fast, well-read junior employee: manage it, review it, and sell the Tuesday afternoon it gives back.",
    speak: [
      {id:"s.m4.fast-junior.a", c:["c.m4.fast-junior","c.m4.human-loop"], prompt:"The fast junior", words:["Junior","Briefing","Review"], points:[
        "AI has read everything and types faster than anyone alive, but it started this morning.",
        "Brief it like a new employee: who you are, what good looks like, two examples.",
        "Nothing customer-facing goes out without your eyes on it.",
        "You do not fire a team because a junior joined: you stop paying seniors for junior work."]},
      {id:"s.m4.ai-workflow.a", c:["c.m4.ai-workflow","c.m4.ai"], prompt:"Rules before robots", words:["Automation","AI","Order"], points:[
        "Most businesses asking about AI actually need plain automation first.",
        "Rules are cheaper, reliable, and show wins in week one.",
        "AI shines on the judgment work: drafting, sorting, answering the twenty questions.",
        "Saying 'you do not need AI yet' is the most trust-building sentence you own."]},
      {id:"s.m4.hallucination.a", c:["c.m4.hallucination","c.m4.grounding","c.m4.human-loop"], prompt:"The honest fine print", words:["Nonsense","Confidence","Double-check"], points:[
        "AI sometimes states nonsense with full confidence: that is called hallucination.",
        "Anyone selling AI without mentioning it is selling the brochure.",
        "The craft: real business data underneath, and a human on the send button.",
        "Give it permission to say 'I do not know, a colleague will answer'."]}
    ]
  },
  m5: {
    idea: "Every system is three layers: a place data lives, rules that move it, screens people touch.",
    speak: [
      {id:"s.m5.three-layers.a", c:["c.m5.three-layers","c.m5.backend","c.m5.frontend"], prompt:"Three layers", words:["Data","Rules","Screens"], points:[
        "A place where information lives: the database.",
        "Rules that move it: what happens when a booking or payment lands.",
        "Screens people touch: the website and the team's dashboard.",
        "When a business feels broken, one of the three is missing or doubled."]},
      {id:"s.m5.three-layers.b", c:["c.m5.three-layers","c.m5.realtime","c.m5.database"], prompt:"Why double bookings happen", words:["Lists","Disagree","One"], points:[
        "A double booking is never bad luck: it is two lists disagreeing about one scooter.",
        "Paper agenda, WhatsApp thread, spreadsheet: three filing cabinets that drift apart.",
        "The fix is not being more careful, it is one list that everything reads from.",
        "Same availability on the website, the phone and the counter: one source of truth."]},
      {id:"s.m5.api.a", c:["c.m5.api","c.m5.webhook","c.m5.integration"], prompt:"Plugs and doorbells", words:["API","Webhook","Messenger"], points:[
        "An API is the plug a system offers so other software can connect.",
        "A webhook is the doorbell: it rings you the instant something happens.",
        "An integration is the finished bridge: payment tells booking, booking tells email.",
        "The owner retires as the messenger between their own systems."]}
    ]
  },
  m6: {
    idea: "You are not trying to win the deal. You are trying to be the most useful fifteen minutes of that owner's month.",
    speak: [
      {id:"s.m6.spine.a", c:["c.m6.spine","c.m6.two-thirds","c.m6.one-recommendation"], prompt:"The conversation spine", words:["Listen","Diagnose","Recommend"], points:[
        "Listen and dig before you explain: the prospect talks two thirds of the time.",
        "Diagnose silently: the stated problem and the real problem differ half the time.",
        "Say the real problem back in their own words before proposing anything.",
        "One recommendation, not a menu, and a concrete next step with a date."]},
      {id:"s.m6.insider-question.a", c:["c.m6.insider-question","c.m6.tuesday-move"], prompt:"Ask an insider question", words:["Moment","Ask","Silence"], points:[
        "Name a painful moment only insiders know: the late return, the 11 pm request.",
        "Ask how they handle it, then be quiet.",
        "They conclude on their own that you have stood where they stand.",
        "A question can carry more proof than a portfolio."]},
      {id:"s.m6.story-arc.a", c:["c.m6.story-arc","c.m6.close-lite"], prompt:"A story in thirty seconds", words:["Situation","Turn","Familiar"], points:[
        "Situation: a rental owner confirmed every booking himself, at all hours.",
        "Turn: requests now land on his phone, one tap approves, emails send themselves.",
        "Takeaway: he kept every yes and lost the running around.",
        "End with a handback: does any of that sound like your evenings?"]}
    ]
  }
};
