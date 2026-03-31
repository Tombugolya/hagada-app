export interface SederStep {
  id: string;
  number: number;
  hebrew: string;
  transliteration: string;
  english: string;
  description: string;
  colorTheme: {
    gradient: string;
    accent: string;
  };
  icon: string;
}

export const sederSteps: SederStep[] = [
  {
    id: 'kadesh', number: 1, hebrew: 'קַדֵּשׁ', transliteration: 'Kadesh', english: 'Sanctification',
    description: 'Recite the Kiddush blessing over the first cup of wine',
    colorTheme: { gradient: 'bg-gradient-to-b from-wine-dark/80 via-midnight to-midnight', accent: '#722F37' },
    icon: '🍷',
  },
  {
    id: 'urchatz', number: 2, hebrew: 'וּרְחַץ', transliteration: 'Urchatz', english: 'Washing',
    description: 'Wash hands without a blessing',
    colorTheme: { gradient: 'bg-gradient-to-b from-sea/40 via-midnight to-midnight', accent: '#2d7ab0' },
    icon: '💧',
  },
  {
    id: 'karpas', number: 3, hebrew: 'כַּרְפַּס', transliteration: 'Karpas', english: 'Vegetable',
    description: 'Dip a vegetable in salt water',
    colorTheme: { gradient: 'bg-gradient-to-b from-spring/40 via-midnight to-midnight', accent: '#4a8a4a' },
    icon: '🌿',
  },
  {
    id: 'yachatz', number: 4, hebrew: 'יַחַץ', transliteration: 'Yachatz', english: 'Breaking',
    description: 'Break the middle matzah',
    colorTheme: { gradient: 'bg-gradient-to-b from-sand/20 via-midnight to-midnight', accent: '#c2a878' },
    icon: '🫓',
  },
  {
    id: 'maggid', number: 5, hebrew: 'מַגִּיד', transliteration: 'Maggid', english: 'The Story',
    description: 'Tell the story of the Exodus from Egypt',
    colorTheme: { gradient: 'bg-gradient-to-b from-desert/30 via-midnight to-midnight', accent: '#8B6914' },
    icon: '📖',
  },
  {
    id: 'rachtzah', number: 6, hebrew: 'רָחְצָה', transliteration: 'Rachtzah', english: 'Washing',
    description: 'Wash hands with a blessing',
    colorTheme: { gradient: 'bg-gradient-to-b from-sea/30 via-midnight to-midnight', accent: '#2d7ab0' },
    icon: '🫧',
  },
  {
    id: 'motzi', number: 7, hebrew: 'מוֹצִיא', transliteration: 'Motzi', english: 'Blessing over Bread',
    description: 'Recite the blessing over bread',
    colorTheme: { gradient: 'bg-gradient-to-b from-gold-dark/30 via-midnight to-midnight', accent: '#D4AF37' },
    icon: '🌾',
  },
  {
    id: 'matzah', number: 8, hebrew: 'מַצָּה', transliteration: 'Matzah', english: 'Unleavened Bread',
    description: 'Eat the matzah',
    colorTheme: { gradient: 'bg-gradient-to-b from-sand/25 via-midnight to-midnight', accent: '#c2a878' },
    icon: '🫓',
  },
  {
    id: 'maror', number: 9, hebrew: 'מָרוֹר', transliteration: 'Maror', english: 'Bitter Herbs',
    description: 'Eat the bitter herbs',
    colorTheme: { gradient: 'bg-gradient-to-b from-spring/30 via-midnight to-midnight', accent: '#2d5a2d' },
    icon: '🥬',
  },
  {
    id: 'korech', number: 10, hebrew: 'כּוֹרֵךְ', transliteration: 'Korech', english: 'Sandwich',
    description: 'Eat the Hillel sandwich',
    colorTheme: { gradient: 'bg-gradient-to-b from-sand/20 via-midnight to-midnight', accent: '#c2a878' },
    icon: '🥪',
  },
  {
    id: 'shulchan-orech', number: 11, hebrew: 'שֻׁלְחָן עוֹרֵךְ', transliteration: 'Shulchan Orech', english: 'The Meal',
    description: 'Enjoy the festive meal',
    colorTheme: { gradient: 'bg-gradient-to-b from-wine-dark/40 via-midnight to-midnight', accent: '#722F37' },
    icon: '🍽️',
  },
  {
    id: 'tzafun', number: 12, hebrew: 'צָפוּן', transliteration: 'Tzafun', english: 'Hidden',
    description: 'Find and eat the Afikoman',
    colorTheme: { gradient: 'bg-gradient-to-b from-royal-light/60 via-midnight to-midnight', accent: '#2d1b4e' },
    icon: '🔍',
  },
  {
    id: 'barech', number: 13, hebrew: 'בָּרֵךְ', transliteration: 'Barech', english: 'Grace After Meals',
    description: 'Say grace and drink the third cup',
    colorTheme: { gradient: 'bg-gradient-to-b from-wine-dark/50 via-midnight to-midnight', accent: '#722F37' },
    icon: '🙏',
  },
  {
    id: 'hallel', number: 14, hebrew: 'הַלֵּל', transliteration: 'Hallel', english: 'Praise',
    description: 'Recite songs of praise',
    colorTheme: { gradient: 'bg-gradient-to-b from-gold/20 via-midnight to-midnight', accent: '#D4AF37' },
    icon: '🎶',
  },
  {
    id: 'nirtzah', number: 15, hebrew: 'נִרְצָה', transliteration: 'Nirtzah', english: 'Conclusion',
    description: 'Next year in Jerusalem!',
    colorTheme: { gradient: 'bg-gradient-to-b from-royal-light/50 via-gold/10 to-midnight', accent: '#D4AF37' },
    icon: '✨',
  },
];

// ─── Haggadah Text Content ─────────────────────────────────────────

export interface HaggadahSection {
  title: string;
  hebrewTitle: string;
  instruction?: string;
  blessing?: string;
  blessingHebrew?: string;
  blessingEnglish?: string;
  content: string[];
  hebrewContent?: string[];
  commentary?: string;
}

export const haggadahText: Record<string, HaggadahSection> = {
  kadesh: {
    title: 'Kadesh — Sanctification',
    hebrewTitle: 'קַדֵּשׁ',
    instruction: 'Fill the first cup of wine. On Shabbat, begin with the Shabbat Kiddush. Rise, lift the cup, and recite:',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, borei p\'ri ha-gafen.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the vine.',
    content: [
      'Blessed are You, Lord our God, King of the universe, who has chosen us from among all peoples, and raised us above all tongues, and sanctified us with His commandments.',
      'And You have given us, Lord our God, with love, appointed times for happiness, holidays and seasons for joy, this day of the Festival of Matzot, the time of our freedom, a holy convocation in memory of the Exodus from Egypt.',
      'For You have chosen us and sanctified us above all peoples. And Your holy festivals in happiness and joy You have given us as a heritage.',
      'Blessed are You, Lord, who sanctifies Israel and the festive seasons.',
      'Blessed are You, Lord our God, King of the universe, who has kept us alive, sustained us, and brought us to this season.',
    ],
    hebrewContent: [
      'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר בָּחַר בָּנוּ מִכָּל עָם, וְרוֹמְמָנוּ מִכָּל לָשׁוֹן, וְקִדְּשָׁנוּ בְּמִצְוֹתָיו.',
      'וַתִּתֶּן לָנוּ יְיָ אֱלֹהֵינוּ בְּאַהֲבָה מוֹעֲדִים לְשִׂמְחָה, חַגִּים וּזְמַנִּים לְשָׂשׂוֹן, אֶת יוֹם חַג הַמַּצוֹת הַזֶּה, זְמַן חֵרוּתֵנוּ, מִקְרָא קֹדֶשׁ, זֵכֶר לִיצִיאַת מִצְרָיִם.',
      'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁהֶחֱיָנוּ וְקִיְּמָנוּ וְהִגִּיעָנוּ לַזְמַן הַזֶּה.',
    ],
    commentary: 'The Seder begins with Kiddush, sanctifying the holiday over a cup of wine. We drink while reclining to the left, as free people do. This is the first of four cups we will drink tonight, corresponding to the four expressions of redemption God used when promising to free Israel from Egypt.',
  },
  urchatz: {
    title: 'Urchatz — Washing',
    hebrewTitle: 'וּרְחַץ',
    instruction: 'Wash your hands by pouring water over them, but do not recite a blessing. This is a ritual purification before dipping the Karpas.',
    content: [
      'We wash our hands without saying a blessing, as a preparatory act of purification before dipping the vegetable in salt water.',
      'This unusual washing — without a blessing — is one of the many things that make this night different from all other nights, arousing the curiosity of the children.',
    ],
    commentary: 'Usually we only wash before eating bread. Washing before eating a vegetable dipped in liquid is an ancient practice that is unusual enough to provoke questions — which is the very purpose of the Seder.',
  },
  karpas: {
    title: 'Karpas — Vegetable',
    hebrewTitle: 'כַּרְפַּס',
    instruction: 'Take a vegetable — parsley, celery, or potato — and dip it in salt water. Recite the blessing and eat.',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, borei p\'ri ha-adamah.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הָאֲדָמָה.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the earth.',
    content: [
      'We dip a vegetable into salt water and eat it. The salt water represents the tears of our ancestors who suffered as slaves in Egypt.',
      'The green vegetable symbolizes the humble origins of the Jewish people, and the coming of spring — the season of renewal and hope.',
      'As we taste the salt water, we recall the tears of bondage. Yet the fresh green vegetable reminds us that even in the midst of tears, hope springs eternal.',
    ],
    commentary: 'The Hebrew letters of "karpas" can be rearranged to spell "samech perech" — the backbreaking labor of 600,000 Israelites. Even as we taste spring and renewal, we remember the suffering that preceded our freedom.',
  },
  yachatz: {
    title: 'Yachatz — Breaking',
    hebrewTitle: 'יַחַץ',
    instruction: 'Take the middle matzah of the three on the Seder plate and break it in two. The larger piece is set aside as the Afikoman.',
    content: [
      'The leader takes the middle matzah and breaks it into two unequal pieces.',
      'The smaller piece is placed back between the other two matzot.',
      'The larger piece is wrapped in a cloth or napkin and set aside — or hidden — as the Afikoman, which will be the last food eaten at the Seder.',
      'This is the bread of poverty. Just as a poor person saves part of their bread for later, not knowing when their next meal will come, we too set aside a portion.',
    ],
    commentary: 'Why the middle matzah? The three matzot represent the three groups of Jews: Kohen, Levi, and Yisrael. The middle matzah (Levi) is broken, symbolizing humility and the brokenness of slavery. The hidden Afikoman represents the hidden redemption that is yet to come.',
  },

  // ─── MAGGID SUB-SECTIONS ─────────────────────────────────────────

  maggid: {
    title: 'Maggid — The Story',
    hebrewTitle: 'מַגִּיד',
    instruction: 'Uncover the matzot, raise the Seder plate, and begin telling the story of the Exodus.',
    content: [
      'This is the heart of the Seder — the telling of our story. From slavery to freedom, from despair to joy, from darkness to great light.',
    ],
    commentary: 'Maggid is the longest and most important section of the Seder. The Torah commands us: "You shall tell your child on that day, saying: It is because of what the Lord did for me when I came out of Egypt." The word "Haggadah" itself means "the telling."',
  },
  'ha-lachma-anya': {
    title: 'Ha Lachma Anya — Bread of Affliction',
    hebrewTitle: 'הָא לַחְמָא עַנְיָא',
    instruction: 'Uncover the matzot, raise the broken middle matzah, and recite:',
    content: [
      'This is the bread of affliction which our ancestors ate in the land of Egypt.',
      'Let all who are hungry come and eat. Let all who are in need come and share the Passover meal.',
      'Now we are here — next year may we be in the Land of Israel.',
      'Now we are slaves — next year may we be free.',
    ],
    hebrewContent: [
      'הָא לַחְמָא עַנְיָא דִּי אֲכָלוּ אַבְהָתָנָא בְּאַרְעָא דְמִצְרָיִם.',
      'כָּל דִּכְפִין יֵיתֵי וְיֵכֹל, כָּל דִּצְרִיךְ יֵיתֵי וְיִפְסַח.',
      'הָשַּׁתָּא הָכָא, לְשָׁנָה הַבָּאָה בְּאַרְעָא דְיִשְׂרָאֵל.',
      'הָשַּׁתָּא עַבְדֵי, לְשָׁנָה הַבָּאָה בְּנֵי חוֹרִין.',
    ],
    commentary: 'We begin by inviting all who are hungry to join us — a reminder that freedom is not complete while others still suffer. This passage is in Aramaic, the everyday language of the Jews in Babylonia, ensuring that even the simplest person could understand the invitation.',
  },
  'four-questions': {
    title: 'Mah Nishtana — The Four Questions',
    hebrewTitle: 'מַה נִּשְׁתַּנָּה',
    instruction: 'The youngest person at the table asks the Four Questions. Cover the matzot and refill the cups.',
    content: [
      'Why is this night different from all other nights?',
      'On all other nights, we eat bread or matzah — but tonight, only matzah.',
      'On all other nights, we eat all kinds of vegetables — but tonight, we eat bitter herbs.',
      'On all other nights, we do not dip our food even once — but tonight, we dip twice.',
      'On all other nights, we eat sitting upright or reclining — but tonight, we all recline.',
    ],
    hebrewContent: [
      'מַה נִּשְׁתַּנָּה הַלַּיְלָה הַזֶּה מִכָּל הַלֵּילוֹת?',
      'שֶׁבְּכָל הַלֵּילוֹת אָנוּ אוֹכְלִין חָמֵץ וּמַצָּה, הַלַּיְלָה הַזֶּה כֻּלּוֹ מַצָּה.',
      'שֶׁבְּכָל הַלֵּילוֹת אָנוּ אוֹכְלִין שְׁאָר יְרָקוֹת, הַלַּיְלָה הַזֶּה מָרוֹר.',
      'שֶׁבְּכָל הַלֵּילוֹת אֵין אָנוּ מַטְבִּילִין אֲפִילוּ פַּעַם אֶחָת, הַלַּיְלָה הַזֶּה שְׁתֵּי פְעָמִים.',
      'שֶׁבְּכָל הַלֵּילוֹת אָנוּ אוֹכְלִין בֵּין יוֹשְׁבִין וּבֵין מְסֻבִּין, הַלַּיְלָה הַזֶּה כֻּלָּנוּ מְסֻבִּין.',
    ],
  },
  'avadim-hayinu': {
    title: 'Avadim Hayinu — We Were Slaves',
    hebrewTitle: 'עֲבָדִים הָיִינוּ',
    content: [
      'We were slaves to Pharaoh in Egypt, and the Lord our God brought us out from there with a mighty hand and an outstretched arm.',
      'Had the Holy One, blessed be He, not brought our ancestors out of Egypt, then we, our children, and our children\'s children would still be enslaved to Pharaoh in Egypt.',
      'Even if all of us were wise, all of us understanding, all of us experienced, all of us knowledgeable in the Torah — it would still be our duty to tell about the Exodus from Egypt.',
      'And the more one tells about the Exodus from Egypt, the more praiseworthy one is.',
    ],
    hebrewContent: [
      'עֲבָדִים הָיִינוּ לְפַרְעֹה בְּמִצְרָיִם, וַיּוֹצִיאֵנוּ יְיָ אֱלֹהֵינוּ מִשָּׁם בְּיָד חֲזָקָה וּבִזְרֹעַ נְטוּיָה.',
      'וְאִלּוּ לֹא הוֹצִיא הַקָּדוֹשׁ בָּרוּךְ הוּא אֶת אֲבוֹתֵינוּ מִמִּצְרָיִם, הֲרֵי אָנוּ וּבָנֵינוּ וּבְנֵי בָנֵינוּ, מְשֻׁעְבָּדִים הָיִינוּ לְפַרְעֹה בְּמִצְרָיִם.',
    ],
    commentary: 'This is the core answer to the Four Questions: we were slaves, and God freed us. The emphasis on personal experience — "as if we ourselves came out of Egypt" — transforms the Seder from a history lesson into a lived experience.',
  },
  'four-sons': {
    title: 'The Four Sons',
    hebrewTitle: 'אַרְבָּעָה בָנִים',
    content: [
      'The Torah speaks of four children: The Wise One, The Wicked One, The Simple One, and The One Who Does Not Know How to Ask.',
    ],
  },
  'ten-plagues': {
    title: 'The Ten Plagues',
    hebrewTitle: 'עֶשֶׂר מַכּוֹת',
    instruction: 'As each plague is named, dip your finger into your wine cup and remove a drop, placing it on your plate. Our joy is diminished by the suffering of others — even our enemies.',
    content: [
      'These are the ten plagues which the Holy One, blessed be He, brought upon the Egyptians in Egypt:',
    ],
    commentary: 'We remove wine — a symbol of joy — from our cup as we recite each plague. For our liberation came at a cost to others, and we cannot rejoice fully when others have suffered, even those who oppressed us. This is a profound moral teaching at the heart of Judaism.',
  },
  dayenu: {
    title: 'Dayenu — It Would Have Been Enough',
    hebrewTitle: 'דַּיֵּנוּ',
    content: [
      'How many levels of goodness has God bestowed upon us!',
    ],
  },
  'pesach-matzah-maror': {
    title: 'Pesach, Matzah, and Maror',
    hebrewTitle: 'פֶּסַח מַצָּה וּמָרוֹר',
    content: [
      'Rabban Gamliel used to say: Whoever does not explain these three things on Passover has not fulfilled their duty. And these are they:',
      'Pesach — the Passover offering. Why did our ancestors eat a Passover offering in Temple times? Because the Holy One, blessed be He, passed over the houses of our ancestors in Egypt, as it says: "You shall say: It is the Passover offering for the Lord, who passed over the houses of the children of Israel in Egypt when He struck the Egyptians and spared our houses."',
      'Matzah — why do we eat this unleavened bread? Because the dough of our ancestors did not have time to become leavened before the King of kings, the Holy One, blessed be He, revealed Himself to them and redeemed them, as it says: "They baked the dough which they had brought from Egypt into unleavened cakes, for it had not leavened, because they were driven out of Egypt and could not delay."',
      'Maror — why do we eat these bitter herbs? Because the Egyptians embittered the lives of our ancestors in Egypt, as it says: "They made their lives bitter with hard labor, with mortar and bricks, and with all manner of work in the field."',
    ],
  },
  'second-cup': {
    title: 'The Second Cup',
    hebrewTitle: 'כּוֹס שְׁנִיָּה',
    instruction: 'Raise the cup of wine and recite:',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, borei p\'ri ha-gafen.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the vine.',
    content: [
      'In every generation, a person is obligated to regard themselves as though they personally had come out of Egypt, as it says: "You shall tell your child on that day, saying: It is because of what the Lord did for me when I came out of Egypt."',
      'It was not only our ancestors whom the Holy One, blessed be He, redeemed. He redeemed us too, along with them, as it says: "He brought us out from there, in order to bring us to, and give us, the land that He promised to our ancestors."',
      'Therefore we are obligated to thank, praise, glorify, exalt, honor, bless, elevate, and acclaim the One who performed all these miracles for our ancestors and for us. He brought us from slavery to freedom, from sorrow to joy, from mourning to celebration, from darkness to great light, and from servitude to redemption. Let us therefore sing a new song before Him! Hallelujah!',
    ],
    hebrewContent: [
      'בְּכָל דּוֹר וָדוֹר חַיָּב אָדָם לִרְאוֹת אֶת עַצְמוֹ כְּאִלּוּ הוּא יָצָא מִמִּצְרָיִם.',
    ],
  },

  // ─── POST-MAGGID SECTIONS ─────────────────────────────────────────

  rachtzah: {
    title: 'Rachtzah — Washing with Blessing',
    hebrewTitle: 'רָחְצָה',
    instruction: 'Wash your hands a second time, now with the blessing, in preparation for eating matzah.',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, asher kid\'shanu b\'mitzvotav v\'tzivanu al n\'tilat yadayim.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל נְטִילַת יָדָיִם.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who has sanctified us with His commandments and commanded us concerning the washing of hands.',
    content: [
      'Now we wash our hands a second time, this time with the blessing, in preparation for eating the matzah. From this point on, we do not speak until after eating the matzah, so that there is no interruption between the blessing and the eating.',
    ],
  },
  motzi: {
    title: 'Motzi — Blessing over Bread',
    hebrewTitle: 'מוֹצִיא',
    instruction: 'Hold all three matzot (the broken middle one between the two whole ones) and recite the standard blessing over bread.',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, ha-motzi lechem min ha-aretz.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who brings forth bread from the earth.',
    content: [
      'Hold all three matzot and recite the standard blessing over bread. Do not eat yet — continue with the next blessing.',
    ],
  },
  matzah: {
    title: 'Matzah — Unleavened Bread',
    hebrewTitle: 'מַצָּה',
    instruction: 'Release the bottom matzah. Hold the top and middle matzot and recite the special blessing for matzah. Then eat from both while reclining to the left.',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, asher kid\'shanu b\'mitzvotav v\'tzivanu al achilat matzah.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל אֲכִילַת מַצָּה.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who has sanctified us with His commandments and commanded us concerning the eating of matzah.',
    content: [
      'Break pieces from the top matzah and the broken middle matzah. Eat them together while reclining to the left — at least an olive\'s volume of each.',
      'The matzah is both the bread of affliction and the bread of freedom. It reminds us of the haste with which our ancestors left Egypt — there was no time for the dough to rise.',
    ],
  },
  maror: {
    title: 'Maror — Bitter Herbs',
    hebrewTitle: 'מָרוֹר',
    instruction: 'Take bitter herbs (horseradish or romaine lettuce), dip in charoset, shake off the charoset, recite the blessing, and eat without reclining.',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, asher kid\'shanu b\'mitzvotav v\'tzivanu al achilat maror.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל אֲכִילַת מָרוֹר.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who has sanctified us with His commandments and commanded us concerning the eating of bitter herbs.',
    content: [
      'We dip the bitter herbs in charoset — a sweet mixture of apples, nuts, wine, and cinnamon that resembles the mortar our ancestors used in their forced labor.',
      'We shake off the charoset before eating, because the mitzvah is to taste the bitterness.',
      'We do not recline when eating maror, because it represents slavery.',
    ],
    commentary: 'The bitterness of the maror connects us viscerally to the suffering of our ancestors. We don\'t just tell the story — we taste it.',
  },
  korech: {
    title: 'Korech — The Hillel Sandwich',
    hebrewTitle: 'כּוֹרֵךְ',
    instruction: 'Take the bottom matzah and make a sandwich with maror and charoset. Eat while reclining.',
    content: [
      'In remembrance of the Temple, following the practice of Hillel.',
      'This is what Hillel did in Temple times: he would make a sandwich of the Passover offering, matzah, and maror and eat them together, to fulfill the verse: "They shall eat it with matzot and bitter herbs." (Numbers 9:11)',
    ],
    commentary: 'Hillel the Elder combined all three — pesach, matzah, and maror — in a single sandwich. Today we combine matzah and maror with charoset, since we no longer have the Passover offering.',
  },
  'shulchan-orech': {
    title: 'Shulchan Orech — The Festive Meal',
    hebrewTitle: 'שֻׁלְחָן עוֹרֵךְ',
    instruction: 'Enjoy the festive meal! It is customary to begin with a hard-boiled egg dipped in salt water.',
    content: [
      'The festive meal is served! Enjoy the delicious food prepared for this special evening.',
      'It is customary to begin the meal with a hard-boiled egg dipped in salt water, symbolizing the festival offering (korban chagigah) and the cycle of life.',
      'Remember to save room — the Afikoman must be eaten at the end of the meal, before midnight!',
    ],
    commentary: 'The egg is a symbol of mourning for the destroyed Temple, but also of renewal and the cycle of life. The rounder it is, the more it reminds us that what goes around comes around — oppressors eventually fall.',
  },
  tzafun: {
    title: 'Tzafun — The Hidden Afikoman',
    hebrewTitle: 'צָפוּן',
    instruction: 'After the meal, find the hidden Afikoman and eat it while reclining. It must be eaten before midnight.',
    content: [
      'The Afikoman, hidden earlier during Yachatz, is now brought back and eaten as dessert — the last food of the Seder.',
      'The word "Afikoman" comes from the Greek "epikomion" meaning "after-meal entertainment." The rabbis reinterpreted it to mean that after the Afikoman, no other food should be eaten, so that the taste of matzah lingers.',
      'Children traditionally search for the hidden Afikoman and negotiate a reward for its return — making the Seder fun and engaging for the young ones!',
    ],
    commentary: 'The Afikoman represents the Passover offering that was eaten at the end of the meal in Temple times. By eating it last, we ensure that the taste of freedom is the last thing on our lips.',
  },
  barech: {
    title: 'Barech — Grace After Meals',
    hebrewTitle: 'בָּרֵךְ',
    instruction: 'Fill the third cup of wine. Recite Birkat Hamazon (Grace After Meals). Also fill the Cup of Elijah and open the door.',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, borei p\'ri ha-gafen.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the vine.',
    content: [
      'We recite the Grace After Meals and drink the third cup of wine while reclining.',
      'We now fill the Cup of Elijah — a special goblet set in the center of the table — and open the front door to welcome the prophet Elijah, harbinger of the Messiah.',
      'Elijah the Prophet, Elijah the Tishbite, Elijah the Gileadite — speedily in our days, may he come to us, with the Messiah, son of David.',
    ],
    hebrewContent: [
      'אֵלִיָּהוּ הַנָּבִיא, אֵלִיָּהוּ הַתִּשְׁבִּי, אֵלִיָּהוּ הַגִּלְעָדִי, בִּמְהֵרָה בְיָמֵנוּ יָבוֹא אֵלֵינוּ, עִם מָשִׁיחַ בֶּן דָּוִד.',
    ],
    commentary: 'The Cup of Elijah represents our hope for ultimate redemption. Opening the door symbolizes our faith and trust, and our readiness to welcome the messenger of peace.',
  },
  hallel: {
    title: 'Hallel — Songs of Praise',
    hebrewTitle: 'הַלֵּל',
    instruction: 'Recite the second part of Hallel (Psalms 115-118, 136) and drink the fourth cup of wine.',
    blessing: 'Baruch Atah Adonai, Eloheinu Melech ha-olam, borei p\'ri ha-gafen.',
    blessingHebrew: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.',
    blessingEnglish: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the vine.',
    content: [
      'Not to us, Lord, not to us, but to Your name give glory, for the sake of Your lovingkindness and Your truth.',
      'Give thanks to the Lord for He is good; His lovingkindness endures forever.',
      'From the narrow straits I called upon God; He answered me with the expansiveness of the Divine.',
      'The Lord is with me, I shall not fear — what can man do to me?',
      'The stone which the builders rejected has become the chief cornerstone.',
      'This is the day which the Lord has made; let us rejoice and be glad in it.',
      'O give thanks to the Lord, for He is good, for His lovingkindness endures forever.',
    ],
    hebrewContent: [
      'לֹא לָנוּ יְיָ, לֹא לָנוּ, כִּי לְשִׁמְךָ תֵּן כָּבוֹד, עַל חַסְדְּךָ עַל אֲמִתֶּךָ.',
      'הוֹדוּ לַייָ כִּי טוֹב, כִּי לְעוֹלָם חַסְדּוֹ.',
      'מִן הַמֵּצַר קָרָאתִי יָּהּ, עָנָנִי בַמֶּרְחָב יָהּ.',
      'יְיָ לִי לֹא אִירָא, מַה יַּעֲשֶׂה לִי אָדָם.',
      'אֶבֶן מָאֲסוּ הַבּוֹנִים, הָיְתָה לְרֹאשׁ פִּנָּה.',
      'זֶה הַיּוֹם עָשָׂה יְיָ, נָגִילָה וְנִשְׂמְחָה בוֹ.',
    ],
    commentary: 'Hallel — psalms of praise — is split in the Seder. The first part (Psalms 113-114) was recited before the meal as part of Maggid. Now we complete it with Psalms 115-118 and the Great Hallel (Psalm 136). We then drink the fourth and final cup of wine.',
  },
  nirtzah: {
    title: 'Nirtzah — Accepted / Conclusion',
    hebrewTitle: 'נִרְצָה',
    content: [
      'The Seder is now concluded, according to its laws, with all its ordinances and statutes.',
      'Just as we were privileged to arrange it tonight, so may we be privileged to perform it in the future.',
      'O Pure One, who dwells on high, raise up the congregation which is without number.',
      'Speedily lead the offshoots of Your stock, redeemed, to Zion in joyous song.',
    ],
    hebrewContent: [
      'חֲסַל סִדּוּר פֶּסַח כְּהִלְכָתוֹ, כְּכָל מִשְׁפָּטוֹ וְחֻקָּתוֹ.',
      'כַּאֲשֶׁר זָכִינוּ לְסַדֵּר אוֹתוֹ, כֵּן נִזְכֶּה לַעֲשׂוֹתוֹ.',
      'לְשָׁנָה הַבָּאָה בִּירוּשָׁלָיִם!',
    ],
    commentary: 'The Seder concludes with the hope that next year we will celebrate in Jerusalem. Many families continue with traditional songs — Chad Gadya (One Little Goat) and Echad Mi Yodea (Who Knows One) — long into the night.',
  },
};

// ─── FOUR SONS DATA ─────────────────────────────────────────────────

export interface FourSon {
  type: string;
  hebrew: string;
  icon: string;
  color: string;
  question: string;
  response: string;
}

export const fourSons: FourSon[] = [
  {
    type: 'The Wise Child',
    hebrew: 'חָכָם',
    icon: '📚',
    color: 'from-blue-900/50 to-blue-800/30',
    question: '"What are the testimonies, statutes, and laws which the Lord our God has commanded you?"',
    response: 'Teach this child all the laws of Passover, down to the very last detail — even that one may not eat anything after the Afikoman. The wise child wants to understand deeply and fully.',
  },
  {
    type: 'The Wicked Child',
    hebrew: 'רָשָׁע',
    icon: '😤',
    color: 'from-red-900/50 to-red-800/30',
    question: '"What does this service mean to you?"',
    response: 'By saying "to you" and not "to me," this child excludes themselves from the community. You should respond: "It is because of what God did for me when I came out of Egypt" — for me, not for you. Had you been there, you would not have been redeemed.',
  },
  {
    type: 'The Simple Child',
    hebrew: 'תָּם',
    icon: '😊',
    color: 'from-green-900/50 to-green-800/30',
    question: '"What is this?"',
    response: 'Tell this child simply: "With a mighty hand God brought us out of Egypt, from the house of bondage." Give a clear, straightforward answer that satisfies genuine curiosity.',
  },
  {
    type: 'The One Who Does Not Know How to Ask',
    hebrew: 'שֶׁאֵינוֹ יוֹדֵעַ לִשְׁאוֹל',
    icon: '🤫',
    color: 'from-purple-900/50 to-purple-800/30',
    question: '(This child does not know how to ask)',
    response: 'You must open the conversation for this child, as the Torah says: "You shall tell your child on that day, saying: It is because of what the Lord did for me when I came out of Egypt." Meet people where they are — begin the story for those who cannot begin it themselves.',
  },
];

// ─── TEN PLAGUES ────────────────────────────────────────────────────

export interface Plague {
  english: string;
  hebrew: string;
  hebrewName: string;
  icon: string;
  description: string;
  effect: string;
}

export const plagues: Plague[] = [
  { english: 'Blood', hebrew: 'דָּם', hebrewName: 'Dam', icon: '🩸', description: 'The waters of Egypt turned to blood', effect: 'blood' },
  { english: 'Frogs', hebrew: 'צְפַרְדֵּעַ', hebrewName: 'Tzfardea', icon: '🐸', description: 'Frogs swarmed the land of Egypt', effect: 'frogs' },
  { english: 'Lice', hebrew: 'כִּנִּים', hebrewName: 'Kinim', icon: '🦟', description: 'The dust of the earth became lice', effect: 'lice' },
  { english: 'Wild Beasts', hebrew: 'עָרוֹב', hebrewName: 'Arov', icon: '🦁', description: 'Swarms of wild beasts roamed Egypt', effect: 'beasts' },
  { english: 'Pestilence', hebrew: 'דֶּבֶר', hebrewName: 'Dever', icon: '🐄', description: 'A deadly plague struck the livestock', effect: 'pestilence' },
  { english: 'Boils', hebrew: 'שְׁחִין', hebrewName: "Sh'chin", icon: '🔴', description: 'Painful boils covered the Egyptians', effect: 'boils' },
  { english: 'Hail', hebrew: 'בָּרָד', hebrewName: 'Barad', icon: '🌨️', description: 'Hail of fire rained down upon Egypt', effect: 'hail' },
  { english: 'Locusts', hebrew: 'אַרְבֶּה', hebrewName: 'Arbeh', icon: '🦗', description: 'Locusts devoured every growing thing', effect: 'locusts' },
  { english: 'Darkness', hebrew: 'חֹשֶׁךְ', hebrewName: 'Choshech', icon: '🌑', description: 'Three days of impenetrable darkness', effect: 'darkness' },
  { english: 'Death of Firstborn', hebrew: 'מַכַּת בְּכוֹרוֹת', hebrewName: 'Makat Bechorot', icon: '💀', description: 'The firstborn of Egypt perished', effect: 'firstborn' },
];

// ─── DAYENU VERSES ──────────────────────────────────────────────────

export interface DayenuVerse {
  english: string;
  hebrew: string;
}

export const dayenuVerses: DayenuVerse[] = [
  { english: 'Had He brought us out of Egypt and not executed judgments against them', hebrew: 'אִלּוּ הוֹצִיאָנוּ מִמִּצְרַיִם, וְלֹא עָשָׂה בָהֶם שְׁפָטִים' },
  { english: 'Had He executed judgments against them and not against their gods', hebrew: 'אִלּוּ עָשָׂה בָהֶם שְׁפָטִים, וְלֹא עָשָׂה בֵאלֹהֵיהֶם' },
  { english: 'Had He destroyed their gods and not slain their firstborn', hebrew: 'אִלּוּ עָשָׂה בֵאלֹהֵיהֶם, וְלֹא הָרַג אֶת בְּכוֹרֵיהֶם' },
  { english: 'Had He slain their firstborn and not given us their wealth', hebrew: 'אִלּוּ הָרַג אֶת בְּכוֹרֵיהֶם, וְלֹא נָתַן לָנוּ אֶת מָמוֹנָם' },
  { english: 'Had He given us their wealth and not split the sea for us', hebrew: 'אִלּוּ נָתַן לָנוּ אֶת מָמוֹנָם, וְלֹא קָרַע לָנוּ אֶת הַיָּם' },
  { english: 'Had He split the sea for us and not led us through it on dry land', hebrew: 'אִלּוּ קָרַע לָנוּ אֶת הַיָּם, וְלֹא הֶעֱבִירָנוּ בְתוֹכוֹ בֶּחָרָבָה' },
  { english: 'Had He led us through on dry land and not drowned our oppressors in it', hebrew: 'אִלּוּ הֶעֱבִירָנוּ בְתוֹכוֹ בֶּחָרָבָה, וְלֹא שִׁקַּע צָרֵינוּ בְּתוֹכוֹ' },
  { english: 'Had He provided for our needs in the desert for forty years and not fed us manna', hebrew: 'אִלּוּ סִפֵּק צָרְכֵּינוּ בַּמִּדְבָּר אַרְבָּעִים שָׁנָה, וְלֹא הֶאֱכִילָנוּ אֶת הַמָּן' },
  { english: 'Had He fed us manna and not given us the Shabbat', hebrew: 'אִלּוּ הֶאֱכִילָנוּ אֶת הַמָּן, וְלֹא נָתַן לָנוּ אֶת הַשַּׁבָּת' },
  { english: 'Had He given us the Shabbat and not brought us before Mount Sinai', hebrew: 'אִלּוּ נָתַן לָנוּ אֶת הַשַּׁבָּת, וְלֹא קֵרְבָנוּ לִפְנֵי הַר סִינַי' },
  { english: 'Had He brought us before Mount Sinai and not given us the Torah', hebrew: 'אִלּוּ קֵרְבָנוּ לִפְנֵי הַר סִינַי, וְלֹא נָתַן לָנוּ אֶת הַתּוֹרָה' },
  { english: 'Had He given us the Torah and not brought us to the Land of Israel', hebrew: 'אִלּוּ נָתַן לָנוּ אֶת הַתּוֹרָה, וְלֹא הִכְנִיסָנוּ לְאֶרֶץ יִשְׂרָאֵל' },
  { english: 'Had He brought us to the Land of Israel and not built the Temple for us', hebrew: 'אִלּוּ הִכְנִיסָנוּ לְאֶרֶץ יִשְׂרָאֵל, וְלֹא בָנָה לָנוּ אֶת בֵּית הַבְּחִירָה' },
];

// ─── FOUR QUESTIONS (for quiz) ──────────────────────────────────────

export interface QuizQuestion {
  question: string;
  questionHebrew: string;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
}

export const fourQuestionsQuiz: QuizQuestion[] = [
  {
    question: 'On all other nights we eat bread or matzah. Why tonight only matzah?',
    questionHebrew: 'שֶׁבְּכָל הַלֵּילוֹת אָנוּ אוֹכְלִין חָמֵץ וּמַצָּה, הַלַּיְלָה הַזֶּה כֻּלּוֹ מַצָּה',
    correctAnswer: 'Because our ancestors\' dough did not have time to rise when they fled Egypt in haste',
    wrongAnswers: [
      'Because wheat was too expensive in ancient Egypt',
      'Because matzah tastes better with the Seder foods',
    ],
    explanation: 'When Pharaoh finally let the Israelites go, they left so quickly that their bread dough had no time to rise. The flat, unleavened matzah reminds us of both the haste of our departure and the humility of slavery.',
  },
  {
    question: 'On all other nights we eat all vegetables. Why tonight bitter herbs?',
    questionHebrew: 'שֶׁבְּכָל הַלֵּילוֹת אָנוּ אוֹכְלִין שְׁאָר יְרָקוֹת, הַלַּיְלָה הַזֶּה מָרוֹר',
    correctAnswer: 'To remember how the Egyptians embittered the lives of our ancestors with hard labor',
    wrongAnswers: [
      'Because bitter herbs have special healing properties',
      'Because they were the only vegetables available during the Exodus',
    ],
    explanation: 'The bitter herbs (maror) help us physically taste the bitterness of slavery. As the Torah says: "They made their lives bitter with hard labor, with mortar and brick."',
  },
  {
    question: 'On all other nights we don\'t dip even once. Why tonight do we dip twice?',
    questionHebrew: 'שֶׁבְּכָל הַלֵּילוֹת אֵין אָנוּ מַטְבִּילִין אֲפִילוּ פַּעַם אֶחָת, הַלַּיְלָה הַזֶּה שְׁתֵּי פְעָמִים',
    correctAnswer: 'We dip karpas in salt water (for tears) and maror in charoset (for mortar) — slavery and sweetness together',
    wrongAnswers: [
      'Because dipping food was a sign of royalty in ancient Egypt',
      'Because double-dipping was a Temple ritual for all holidays',
    ],
    explanation: 'The first dipping (vegetable in salt water) recalls tears of slavery. The second (bitter herbs in charoset) combines bitterness with sweetness — suffering and hope, bondage and the promise of redemption.',
  },
  {
    question: 'On all other nights we eat sitting or reclining. Why tonight do we all recline?',
    questionHebrew: 'שֶׁבְּכָל הַלֵּילוֹת אָנוּ אוֹכְלִין בֵּין יוֹשְׁבִין וּבֵין מְסֻבִּין, הַלַּיְלָה הַזֶּה כֻּלָּנוּ מְסֻבִּין',
    correctAnswer: 'Reclining was the ancient way free people ate — we recline to celebrate our freedom',
    wrongAnswers: [
      'Because the Israelites were tired after their journey through the desert',
      'Because reclining aids digestion after eating matzah',
    ],
    explanation: 'In the ancient world, slaves ate hurriedly while standing; free people reclined on cushions at leisure. We recline to the left to embody the experience of freedom and luxury.',
  },
];

// ─── CHAD GADYA ─────────────────────────────────────────────────────

export const chadGadya = [
  'One little goat, one little goat, that father bought for two zuzim. One little goat, one little goat.',
  'Then came a cat and ate the goat that father bought for two zuzim.',
  'Then came a dog and bit the cat that ate the goat...',
  'Then came a stick and beat the dog that bit the cat...',
  'Then came a fire and burned the stick that beat the dog...',
  'Then came water and put out the fire that burned the stick...',
  'Then came an ox and drank the water that put out the fire...',
  'Then came a slaughterer and slaughtered the ox that drank the water...',
  'Then came the Angel of Death and slew the slaughterer...',
  'Then came the Holy One, blessed be He, and smote the Angel of Death who slew the slaughterer who slaughtered the ox who drank the water that put out the fire that burned the stick that beat the dog that bit the cat that ate the goat that father bought for two zuzim. One little goat, one little goat!',
];

// ─── ECHAD MI YODEA ─────────────────────────────────────────────────

export const echadMiYodea = [
  { number: 1, answer: 'One is our God in heaven and on earth' },
  { number: 2, answer: 'Two are the tablets of the covenant' },
  { number: 3, answer: 'Three are the patriarchs' },
  { number: 4, answer: 'Four are the matriarchs' },
  { number: 5, answer: 'Five are the books of the Torah' },
  { number: 6, answer: 'Six are the orders of the Mishnah' },
  { number: 7, answer: 'Seven are the days of the week' },
  { number: 8, answer: 'Eight are the days to circumcision' },
  { number: 9, answer: 'Nine are the months to childbirth' },
  { number: 10, answer: 'Ten are the commandments' },
  { number: 11, answer: 'Eleven are the stars in Joseph\'s dream' },
  { number: 12, answer: 'Twelve are the tribes of Israel' },
  { number: 13, answer: 'Thirteen are the attributes of God' },
];
