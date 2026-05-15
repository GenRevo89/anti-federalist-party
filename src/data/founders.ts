export interface Founder {
  slug: string;
  name: string;
  born: string;
  died: string;
  title: string;
  penName: string;
  portrait: string;
  tagline: string;
  category: 'anti-federalist' | 'persuaded';
  biography: string;
  contributions: string[];
  keyWritings: { title: string; year: string; significance: string }[];
  modernEssay: {
    title: string;
    paragraphs: string[];
  };
}

export const FOUNDERS: Founder[] = [
  {
    category: 'anti-federalist',
    slug: 'patrick-henry',
    name: 'Patrick Henry',
    born: '1736',
    died: '1799',
    title: 'Governor of Virginia, Orator',
    penName: '',
    portrait: '',
    tagline: 'Give me liberty, or give me death.',
    biography: 'Patrick Henry was the most electrifying orator of the revolutionary era and the most vocal opponent of the proposed Constitution. As Governor of Virginia, he wielded enormous political influence and used it to demand a Bill of Rights as a condition of ratification. His fiery speeches at the Virginia Ratifying Convention are among the most powerful arguments for individual liberty ever delivered. Without Henry\'s relentless pressure, the Bill of Rights might never have been added to the Constitution.',
    contributions: [
      'Led opposition to the Constitution at the Virginia Ratifying Convention',
      'His demand for a Bill of Rights directly led to the first ten amendments',
      'Warned prophetically about the dangers of a powerful federal executive',
      'Argued that the Constitution\'s "We the People" preamble usurped state sovereignty',
      'Predicted that federal taxation power would lead to tyranny',
    ],
    keyWritings: [
      { title: 'Virginia Ratifying Convention Speeches', year: '1788', significance: 'The most powerful oral arguments against the Constitution, warning about executive tyranny and the loss of state sovereignty.' },
      { title: '"Give Me Liberty, or Give Me Death" Speech', year: '1775', significance: 'The defining speech of the American Revolution, establishing Henry as the voice of radical liberty.' },
    ],
    modernEssay: {
      title: 'What Would Patrick Henry Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'Patrick Henry would look at modern America and see every nightmare he warned about made real. A standing army of 1.3 million. A surveillance apparatus that monitors every citizen. A federal government that spends $6.5 trillion annually while communities cannot fund their own schools. An executive who governs by decree. Henry did not predict these things because he was a prophet — he predicted them because he understood human nature and the corrupting effects of concentrated power.',
        'Henry would be horrified by the Patriot Act — legislation that grants the federal government exactly the kind of warrantless search power he fought a revolution to abolish. He would see the NSA, the CIA, and the FBI as the standing army he warned about: permanent, professional, and answerable to no one. "The militia, sir, is our ultimate safety," he told the Virginia Convention. The modern surveillance state is the antithesis of everything he fought for.',
        'But Henry would also be electrified by the emergence of the modern Anti-Federalist Party. He would see in this movement the vindication of every argument he made in 1788. The Constitution without the Bill of Rights was a blueprint for tyranny. The Constitution WITH the Bill of Rights — when actually enforced — is a blueprint for liberty. The modern Anti-Federalist Party exists to enforce what Henry demanded.',
        'Henry\'s most powerful insight was structural, not political. He understood that good people in bad systems produce bad outcomes. "The Constitution is not an instrument for the government to restrain the people," he would say today. "It is an instrument for the people to restrain the government." The modern Anti-Federalist Party is the organizational expression of that restraint — built from the county level up, exactly as Henry would have designed it.',
        'If Patrick Henry were alive today, he would not run for president. He would organize his county. He would build a local militia of ideas — a community-based political movement that no federal apparatus could co-opt or control. He would look at the modern Anti-Federalist Party\'s county-by-county infrastructure and say: "Finally. Someone listened."',
      ],
    },
  },
  {
    category: 'anti-federalist',
    slug: 'george-mason',
    name: 'George Mason',
    born: '1725',
    died: '1792',
    title: 'Delegate to the Constitutional Convention',
    penName: '',
    portrait: '',
    tagline: 'The father of the Bill of Rights who refused to sign the Constitution.',
    biography: 'George Mason was one of only three delegates to the Constitutional Convention who refused to sign the final document — specifically because it lacked a Bill of Rights. Mason authored the Virginia Declaration of Rights in 1776, which directly inspired the Declaration of Independence, the French Declaration of the Rights of Man, and eventually the U.S. Bill of Rights. He was the intellectual architect of American civil liberties.',
    contributions: [
      'Authored the Virginia Declaration of Rights (1776) — the template for the Bill of Rights',
      'Refused to sign the Constitution because it lacked explicit protections for individual rights',
      'His objections directly led to the promise of a Bill of Rights as a condition of ratification',
      'Warned about the dangers of the slave trade compromise and the Commerce Clause',
      'Predicted that the federal judiciary would become an unchecked power',
    ],
    keyWritings: [
      { title: 'Virginia Declaration of Rights', year: '1776', significance: 'The foundational document of American civil liberties, preceding and inspiring the Declaration of Independence itself.' },
      { title: 'Objections to the Constitution', year: '1787', significance: 'A systematic critique of the Constitution\'s structural flaws, focusing on the absence of a Bill of Rights and the dangers of unlimited federal power.' },
    ],
    modernEssay: {
      title: 'What Would George Mason Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'George Mason refused to sign the Constitution because it did not protect individual rights. If he could see modern America — where the Fourth Amendment is routinely violated by mass surveillance, the First Amendment is under assault from both government and corporate censorship, and the Tenth Amendment is treated as a historical footnote — he would say he was right to refuse.',
        'Mason would be particularly alarmed by the erosion of the rights he personally authored. The Virginia Declaration of Rights stated that "all men are by nature equally free and independent and have certain inherent rights." Mason meant this literally — inherent, inalienable, non-negotiable. The modern practice of treating constitutional rights as subject to "balancing tests" and "national security exceptions" would horrify him.',
        'The modern Anti-Federalist Party\'s commitment to individual data sovereignty would resonate deeply with Mason. He understood that privacy is not merely a convenience — it is a prerequisite for liberty. A government that knows everything about its citizens controls them, whether or not it uses force. Mason would see data sovereignty as the 21st-century expression of the Fourth Amendment he helped create.',
        'Mason would endorse the Anti-Federalist Party\'s structural approach to reform. He was not interested in electing better people to a broken system — he wanted to fix the system itself. His objections to the Constitution were structural, not partisan. He did not oppose specific policies — he opposed a framework that enabled tyranny regardless of who held power.',
        'If George Mason were alive today, he would draft a new Declaration of Digital Rights — extending the protections he wrote in 1776 to cover algorithmic decision-making, data collection, and corporate surveillance. He would see the modern Anti-Federalist Party as the natural heir to his work: a movement dedicated to the proposition that rights are inherent, not granted by government.',
      ],
    },
  },
  {
    category: 'anti-federalist',
    slug: 'brutus',
    name: 'Robert Yates (Brutus)',
    born: '1738',
    died: '1801',
    title: 'New York Supreme Court Justice',
    penName: 'Brutus',
    portrait: '',
    tagline: 'The pen name that predicted judicial supremacy.',
    biography: 'Robert Yates, writing under the pen name "Brutus," produced what many scholars consider the most intellectually rigorous Anti-Federalist writings. His sixteen essays, published between October 1787 and April 1788, systematically dismantled the case for the proposed Constitution. His predictions about the Supreme Court\'s eventual supremacy over all other branches of government proved remarkably prescient — arguably the most accurate political prediction in American history.',
    contributions: [
      'Authored the Brutus essays — sixteen masterpieces of constitutional critique',
      'Predicted that the Supreme Court would become the supreme arbiter of all law, unchecked by any other branch',
      'Warned that the Necessary and Proper Clause would be used to justify unlimited federal power',
      'Walked out of the Constitutional Convention in protest before the document was completed',
      'His essays were so influential that James Madison wrote several Federalist Papers specifically to counter them',
    ],
    keyWritings: [
      { title: 'Brutus No. 1', year: '1787', significance: 'The opening salvo — argued that a republic could not govern a territory as vast as the United States without becoming tyrannical.' },
      { title: 'Brutus No. 11-15', year: '1788', significance: 'Predicted with stunning accuracy that the Supreme Court would accumulate unchecked power, operating as an unelected legislature with no accountability.' },
    ],
    modernEssay: {
      title: 'What Would Brutus Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'Brutus predicted that the Supreme Court would become the most dangerous branch of government — unelected, unaccountable, and supreme over all other authorities. He wrote this in 1788. In 2022, the Supreme Court overturned Roe v. Wade, a 50-year precedent, with no democratic input whatsoever. Six unelected lawyers changed the law for 330 million people. Brutus was right.',
        'The Necessary and Proper Clause — which Brutus called "the most alarming provision" of the Constitution — has been used exactly as he predicted. The federal government has invoked it to justify the Patriot Act, the ACA individual mandate, federal drug prohibition, and virtually every expansion of federal power in the last two centuries. Every time Congress wants to do something the Constitution does not authorize, they cite the Necessary and Proper Clause. Brutus saw this coming 235 years ago.',
        'Brutus\'s most powerful insight was about scale. He argued that a republic governing 300 million people across a continental landmass could not maintain genuine representation. He was right. The average Congressional district now contains over 760,000 people. Your "representative" does not know you, cannot know you, and does not represent you in any meaningful sense. The modern Anti-Federalist Party\'s emphasis on county-level governance is the structural solution to the scale problem Brutus identified.',
        'If Brutus were writing today, his essays would focus on three things: algorithmic governance (decisions made by AI systems with no democratic accountability), executive supremacy (government by executive order), and corporate-state fusion (the merger of private and governmental power that the founders could not have anticipated). Each of these represents an expansion of concentrated power that the constitutional framework has failed to prevent.',
        'Brutus would see the modern Anti-Federalist Party as the intellectual successor to his work. He did not write to win an argument — he wrote to prevent a catastrophe. The catastrophe happened. The party exists to repair the damage.',
      ],
    },
  },
  {
    category: 'anti-federalist',
    slug: 'federal-farmer',
    name: 'Richard Henry Lee (Federal Farmer)',
    born: '1732',
    died: '1794',
    title: 'President of Congress, Senator from Virginia',
    penName: 'Federal Farmer',
    portrait: '',
    tagline: 'The most measured voice in the most important debate.',
    biography: 'Richard Henry Lee is best known for introducing the resolution in the Continental Congress that led to the Declaration of Independence. Writing as the "Federal Farmer," he produced some of the most thoughtful and moderate Anti-Federalist critiques — arguing not against union, but against the specific structure proposed. His letters were widely read and respected even by Federalists for their intellectual rigor and fair-minded analysis.',
    contributions: [
      'Introduced the resolution for American independence in the Continental Congress',
      'Authored the Federal Farmer letters — among the most widely circulated Anti-Federalist writings',
      'Argued for structural amendments before ratification, not after',
      'Advocated for a more representative Congress with smaller districts',
      'Served as one of the first U.S. Senators and continued to advocate for strict constitutional limits',
    ],
    keyWritings: [
      { title: 'Letters from the Federal Farmer', year: '1787-1788', significance: 'Eighteen letters providing a systematic, moderate critique of the Constitution — widely considered the most persuasive Anti-Federalist writings for undecided readers.' },
    ],
    modernEssay: {
      title: 'What Would the Federal Farmer Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'The Federal Farmer was the voice of reason in a debate dominated by passion. He did not oppose the Constitution out of fear — he opposed it because the math did not work. A Congress of 65 members could not represent 3 million people. He was right then. A Congress of 535 members cannot represent 330 million people now. The representation ratio has gotten worse, not better.',
        'Lee\'s most prescient concern was about the "natural aristocracy" — his term for the wealthy, well-connected class that would inevitably dominate a centralized government. He argued that only small districts with genuine local representation could prevent this aristocratic capture. Today, the average winning Congressional campaign costs over $2 million. Only the wealthy or the wealthy-funded can compete. The natural aristocracy Lee warned about is now the only aristocracy.',
        'The Federal Farmer would be deeply interested in the modern Anti-Federalist Party\'s use of technology for local organizing. He was frustrated by the communication limitations of his era — it took weeks for his letters to circulate. The internet provides the instant communication infrastructure that would have made his vision of hyper-local, hyper-engaged democracy possible. Municipal broadband as a public utility would strike him as the most important infrastructure investment a community could make.',
        'Lee was a moderate who believed that good systems produce good outcomes regardless of who holds power. He would approve of the Anti-Federalist Party\'s structural focus — decentralization, local sovereignty, algorithmic transparency — because these are systemic reforms, not personality-driven campaigns. The Federal Farmer did not trust any individual with power. He trusted systems designed to prevent the abuse of power.',
        'If the Federal Farmer were writing today, he would produce a letter series titled "On the Failure of the Constitutional Experiment" — a measured, evidence-based analysis of how every structural flaw he identified in 1787 has manifested exactly as predicted. His conclusion would be the same as ours: the solution is not a better president. The solution is less presidency.',
      ],
    },
  },
  {
    category: 'anti-federalist',
    slug: 'mercy-otis-warren',
    name: 'Mercy Otis Warren',
    born: '1728',
    died: '1814',
    title: 'Author, Playwright, Political Philosopher',
    penName: 'A Columbian Patriot',
    portrait: '',
    tagline: 'The conscience of the Revolution.',
    biography: 'Mercy Otis Warren was one of the most important political writers of the revolutionary era — and the most important female political philosopher in early American history. Her "Observations on the New Constitution," published under the pen name "A Columbian Patriot," was one of the most widely distributed Anti-Federalist pamphlets. She also wrote a three-volume history of the American Revolution that remains a primary source for scholars today.',
    contributions: [
      'Published "Observations on the New Constitution" — one of the most circulated Anti-Federalist pamphlets',
      'Warned that the Constitution would create an aristocratic government disguised as a republic',
      'Argued that the absence of term limits would create a permanent ruling class',
      'Wrote satirical plays attacking British tyranny during the Revolution',
      'Authored a three-volume "History of the American Revolution" — one of the first comprehensive histories',
    ],
    keyWritings: [
      { title: 'Observations on the New Constitution', year: '1788', significance: 'A brilliant critique warning about aristocratic capture, the absence of term limits, and the dangers of a permanent judiciary.' },
      { title: 'History of the Rise, Progress, and Termination of the American Revolution', year: '1805', significance: 'One of the first comprehensive histories of the Revolution, written from a perspective that valued liberty above institutional power.' },
    ],
    modernEssay: {
      title: 'What Would Mercy Otis Warren Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'Mercy Otis Warren warned that the Constitution would create an aristocratic government disguised as a republic. She predicted that without term limits, a permanent ruling class would emerge. Today, Mitch McConnell has served in the Senate for 40 years. Nancy Pelosi served in the House for 36 years. Dianne Feinstein died in office at age 90. Warren was not speculating — she was describing the future with perfect clarity.',
        'Warren was particularly concerned about the intersection of wealth and political power. She wrote that "the seeds of aristocracy" were embedded in the Constitution\'s structure. Today, the average senator\'s net worth exceeds $1 million. Congressional stock trading generates insider profits. Campaign finance laws allow unlimited corporate spending. The aristocracy Warren predicted is not coming — it arrived generations ago.',
        'As a woman excluded from formal political participation in her own era, Warren would be especially attentive to who is excluded from political power today. She would note that while formal legal barriers have fallen, structural barriers remain. The cost of running for office, the dominance of party machinery, the gerrymandering of districts — these create a system that is technically open but practically closed to ordinary citizens.',
        'Warren would champion the Anti-Federalist Party\'s commitment to local governance as the most effective path to genuine representation. She understood that aristocratic capture is easier at the national level, where voters are anonymous and distant. At the county level — where citizens know their representatives personally — accountability is real, not theoretical.',
        'If Mercy Otis Warren were alive today, she would be the movement\'s most prolific writer. She would produce essays, podcasts, and documentaries exposing the aristocratic capture she predicted. She would remind us that the Revolution was fought not just against British tyranny but against the principle of tyranny itself — wherever it originates.',
      ],
    },
  },
  {
    category: 'anti-federalist',
    slug: 'george-clinton',
    name: 'George Clinton (Cato)',
    born: '1739',
    died: '1812',
    title: 'Governor of New York, Vice President',
    penName: 'Cato',
    portrait: '',
    tagline: 'The governor who fought the Constitution and then served under it.',
    biography: 'George Clinton served as Governor of New York for 21 years and later as Vice President under both Thomas Jefferson and James Madison. Writing as "Cato," he produced seven essays opposing the Constitution, focusing on the dangers of executive power and the erosion of state sovereignty. Despite losing the ratification battle, he continued to advocate for strict constitutional limits while serving within the system he had opposed.',
    contributions: [
      'Authored the Cato essays — seven arguments against excessive executive power',
      'Served as Governor of New York for 21 consecutive years, proving that state governance works',
      'Led the Anti-Federalist opposition in the critical New York ratification debate',
      'Served as Vice President, demonstrating that Anti-Federalists could work within the system while reforming it',
      'Warned specifically about the dangers of a four-year presidential term with unlimited reelection',
    ],
    keyWritings: [
      { title: 'Cato Letters', year: '1787-1788', significance: 'Seven essays focused on executive power, warning that the presidency would evolve into an elected monarchy.' },
    ],
    modernEssay: {
      title: 'What Would Cato Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'Cato warned that the presidency would evolve into an elected monarchy. He wrote that a president with four-year terms, command of the military, and the power of the veto would accumulate power until the office was indistinguishable from a king. He was exactly right. Modern presidents govern by executive order, command the largest military in history, and wield veto power to override the will of Congress.',
        'Clinton\'s own career demonstrates the Anti-Federalist path forward. He opposed the Constitution, lost the ratification fight, and then served within the system while continuing to advocate for reform. The modern Anti-Federalist Party operates on the same principle — work within the existing system while building the infrastructure for structural change.',
        'Cato would note with grim satisfaction that every expansion of presidential power he predicted has come true. Executive orders now substitute for legislation. The president deploys military force without Congressional authorization. The federal bureaucracy answers to the executive, not to the people. The elected monarchy Cato feared is the system we live under.',
        'The modern Anti-Federalist Party\'s focus on local governance would appeal to Clinton deeply. As governor of New York for 21 years, he demonstrated that state and local governance could be effective, responsive, and accountable — everything the federal government is not. His career is proof of concept for the decentralized model.',
        'If Cato were writing today, his essays would be titled "On the Imperial Presidency" — a systematic documentation of how the office has absorbed powers the Constitution never granted. His solution would be the same as ours: strip the presidency back to its constitutional limits and return power to the communities that can actually exercise it responsibly.',
      ],
    },
  },
  {
    category: 'anti-federalist',
    slug: 'samuel-adams',
    name: 'Samuel Adams',
    born: '1722',
    died: '1803',
    title: 'Governor of Massachusetts, Revolutionary Leader',
    penName: '',
    portrait: '',
    tagline: 'The original organizer.',
    biography: 'Samuel Adams was the architect of revolutionary resistance — the man who organized the Sons of Liberty, orchestrated the Boston Tea Party, and built the grassroots infrastructure that made the Revolution possible. While his cousin John Adams helped build the new government, Samuel remained deeply skeptical of centralized power and supported the Anti-Federalist cause. He is the father of American political organizing.',
    contributions: [
      'Organized the Sons of Liberty — the first American grassroots political organization',
      'Orchestrated the Boston Tea Party and the Committees of Correspondence',
      'Built the communication network that connected revolutionary communities across the colonies',
      'Insisted on a Bill of Rights as a condition of Massachusetts\' ratification of the Constitution',
      'Served as Governor of Massachusetts, demonstrating effective local governance',
    ],
    keyWritings: [
      { title: 'Massachusetts Ratifying Convention speeches', year: '1788', significance: 'Demanded amendments to protect individual rights as a condition of ratification — establishing the template that other states followed.' },
      { title: 'Letters and circulars to the Committees of Correspondence', year: '1772-1775', significance: 'Created the first American political communication network — the 18th-century equivalent of a grassroots organizing platform.' },
    ],
    modernEssay: {
      title: 'What Would Samuel Adams Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'Samuel Adams would understand the modern Anti-Federalist Party instinctively because he invented the playbook. Organize locally. Build communication networks. Create committees of correspondence — in the 21st century, these are county chapters, community meetings, and municipal broadband. Adams did not wait for permission from the Continental Congress to resist tyranny. He organized his neighborhood first.',
        'Adams would look at the modern Anti-Federalist Party\'s county-by-county organizing strategy and recognize his own Committees of Correspondence — updated for the digital age. He connected 80 communities across Massachusetts through letters and riders. The modern party connects 30,000 municipalities through the internet. The scale has changed. The principle has not.',
        'The Boston Tea Party was an act of economic resistance against corporate-state fusion — the East India Company was granted a government monopoly that undercut local merchants. Adams would see identical dynamics in modern America: Amazon receives government subsidies while destroying local businesses. Google receives government contracts while monopolizing information. The modern Tea Party should be against corporate monopolies, not for them.',
        'Adams was the rare revolutionary who understood that the most important work is the least glamorous. He did not deliver famous speeches or write celebrated documents. He organized meetings, wrote circulars, and built the infrastructure that made other people\'s famous actions possible. The modern Anti-Federalist Party\'s emphasis on local organizing — county commissions, city councils, school boards — is the Samuel Adams model.',
        'If Samuel Adams were alive today, he would not be on Twitter. He would be at a county commission meeting in your community, organizing a local chapter, building the infrastructure for the next revolution. He would tell you that the revolution does not start in Washington. It starts in your neighborhood. It always has.',
      ],
    },
  },
  {
    category: 'anti-federalist',
    slug: 'luther-martin',
    name: 'Luther Martin',
    born: '1748',
    died: '1826',
    title: 'Attorney General of Maryland',
    penName: '',
    portrait: '',
    tagline: 'The man who walked out of the Constitutional Convention.',
    biography: 'Luther Martin was Maryland\'s Attorney General for 32 years and one of the most colorful figures in American constitutional history. He attended the Constitutional Convention as a delegate, became increasingly alarmed by the centralizing tendencies of the document being drafted, and walked out before its completion. His "Genuine Information" speech to the Maryland legislature — a marathon oration lasting several days — is one of the most detailed insider accounts of the Convention\'s deliberations.',
    contributions: [
      'Walked out of the Constitutional Convention in protest against centralization',
      'Delivered the "Genuine Information" address — a multi-day account of the Convention\'s proceedings',
      'Argued that the Constitution violated the mandate of the Convention, which was to amend the Articles, not replace them',
      'Warned that the Supremacy Clause would make federal law override state constitutions',
      'Served as Attorney General of Maryland for 32 years, demonstrating lifelong commitment to state sovereignty',
    ],
    keyWritings: [
      { title: 'The Genuine Information', year: '1788', significance: 'A marathon address to the Maryland legislature revealing the internal debates of the Constitutional Convention and arguing against ratification.' },
    ],
    modernEssay: {
      title: 'What Would Luther Martin Say About the Modern Anti-Federalist Party?',
      paragraphs: [
        'Luther Martin walked out of the Constitutional Convention because he saw the fix was in. The delegates had been sent to amend the Articles of Confederation — instead, they secretly drafted an entirely new government. Martin recognized this as a constitutional coup: a small group of men, meeting in secret, replacing the existing government without the consent of the governed. He would see uncomfortable parallels in modern executive governance — where presidents reshape government through executive orders, bypassing the legislative process entirely.',
        'Martin\'s most important warning was about the Supremacy Clause. He predicted that federal law would systematically override state constitutions, reducing states to administrative districts of the federal government. Today, federal preemption overrides state law on everything from drug policy to environmental regulation. States that legalize marijuana still face federal prosecution. Martin would say: I told you so.',
        'The modern Anti-Federalist Party\'s insistence on county-level sovereignty would resonate with Martin, who spent his entire career defending Maryland\'s independence from federal encroachment. He understood that small communities have the most to lose from centralization and the most to gain from local governance.',
        'Martin was not a polished speaker or an elegant writer — he was a brawler. His speeches were long, passionate, and often disorganized. He would admire the modern Anti-Federalist Party\'s willingness to fight ugly, to take unpopular positions, and to prioritize substance over style. Martin did not care about being liked. He cared about being right.',
        'If Luther Martin were alive today, he would file lawsuits. Against the NSA for violating the Fourth Amendment. Against Congress for delegating legislative authority to executive agencies. Against the Supreme Court for functioning as an unelected legislature. He was a lawyer first and a politician second. He would use every legal tool available to constrain federal power — exactly as he did for 32 years as Maryland\'s Attorney General.',
      ],
    },
  },
  // ─── PERSUADED FOUNDERS ───
  // These founders had Anti-Federalist instincts but were persuaded by Hamilton/Madison.
  // Their essays imagine what they would think now, seeing how the warnings came true.
  {
    category: 'persuaded',
    slug: 'thomas-jefferson',
    name: 'Thomas Jefferson',
    born: '1743',
    died: '1826',
    title: 'Author of the Declaration of Independence, 3rd President',
    penName: '',
    portrait: '',
    tagline: 'The tree of liberty must be refreshed from time to time.',
    biography: 'Thomas Jefferson was in Paris during the Constitutional Convention, but his letters reveal deep Anti-Federalist sympathies. He told Madison the Constitution\'s greatest flaw was the absence of a Bill of Rights. He opposed Hamilton\'s National Bank as unconstitutional. He believed that "the government closest to the people serves the people best." He was, in everything but formal allegiance, an Anti-Federalist who was persuaded — reluctantly — that the Constitution could be fixed through amendments.',
    contributions: [
      'Authored the Declaration of Independence — the philosophical foundation of American liberty',
      'Insisted to Madison, via letters from Paris, that a Bill of Rights was essential',
      'Opposed Hamilton\'s National Bank as an unconstitutional expansion of federal power',
      'Championed agrarian democracy and local self-governance against Hamiltonian centralization',
      'Founded the Democratic-Republican Party specifically to oppose Federalist consolidation of power',
    ],
    keyWritings: [
      { title: 'Letters to James Madison from Paris', year: '1787-1789', significance: 'Private correspondence revealing Jefferson\'s deep skepticism of the Constitution and his insistence on a Bill of Rights.' },
      { title: 'Kentucky Resolutions', year: '1798', significance: 'Argued that states had the right to nullify unconstitutional federal laws — a fundamentally Anti-Federalist position written by a sitting Vice President.' },
    ],
    modernEssay: {
      title: 'What Would Jefferson Think If Hamilton Had Never Convinced Him?',
      paragraphs: [
        'Thomas Jefferson was never truly convinced. He accepted the Constitution as a compromise, not as an ideal. His entire presidency was spent trying to undo Hamiltonian centralization — he eliminated internal taxes, slashed the federal budget, and reduced the standing army. If Hamilton had never made his arguments, Jefferson\'s instincts would have led him straight to the Anti-Federalist camp. And he would have been their most powerful voice.',
        'Jefferson would look at modern America and see Hamilton\'s vision fully realized — and his own worst fears confirmed. A national bank (the Federal Reserve) controls the money supply with no democratic oversight. A permanent military establishment maintains 800 overseas bases. A federal bureaucracy employs 2.9 million people. Jefferson wrote that "the natural progress of things is for liberty to yield and government to gain ground." He could not have imagined how completely he would be proven right.',
        'The Anti-Federalist Party\'s commitment to local governance is pure Jeffersonian democracy. Jefferson believed the ward — the smallest unit of local government — was "the elementary republic" from which all legitimate authority derived. County commissions, city councils, school boards — these are Jefferson\'s wards, the laboratories of democracy he championed. He would see the Anti-Federalist Party as the organizational realization of his vision.',
        'Jefferson\'s most radical insight was about generational sovereignty. He believed that no generation had the right to bind future generations with permanent laws or permanent debt. "The earth belongs to the living," he wrote. Today, the national debt exceeds $34 trillion — obligations imposed on generations that had no voice in creating them. Jefferson would consider this a form of intergenerational tyranny.',
        'If Jefferson had never been persuaded by Madison\'s arguments, he would have led the Anti-Federalist movement from the beginning. He would have demanded not just a Bill of Rights but a fundamentally different structure — one that kept power in the counties, limited the presidency to ceremonial functions, and required each generation to rewrite its own constitution. The modern Anti-Federalist Party is building what Jefferson always wanted but never achieved.',
      ],
    },
  },
  {
    category: 'persuaded',
    slug: 'james-madison',
    name: 'James Madison',
    born: '1751',
    died: '1836',
    title: 'Father of the Constitution, 4th President',
    penName: 'Publius (co-author)',
    portrait: '',
    tagline: 'The man who wrote the Constitution — then spent his life regretting what it became.',
    biography: 'James Madison co-authored the Federalist Papers with Hamilton to argue for ratification. But within five years, Madison had broken with Hamilton completely. He opposed the National Bank, co-founded an opposition party, and authored the Virginia Resolutions asserting states\' right to resist unconstitutional federal acts. The Father of the Constitution became, in practice, an Anti-Federalist — horrified by what Hamilton\'s interpretation of his own document had produced.',
    contributions: [
      'Authored the Bill of Rights — fulfilling the Anti-Federalist demand that made ratification possible',
      'Broke with Hamilton and opposed the National Bank as unconstitutional',
      'Co-founded the Democratic-Republican Party to oppose Federalist consolidation',
      'Authored the Virginia Resolutions asserting states\' rights against the Alien and Sedition Acts',
      'His presidency represented a return to strict constitutional interpretation',
    ],
    keyWritings: [
      { title: 'The Bill of Rights', year: '1789', significance: 'Madison authored the amendments the Anti-Federalists demanded — conceding that they were right about the Constitution\'s most critical flaw.' },
      { title: 'Virginia Resolutions', year: '1798', significance: 'A fundamentally Anti-Federalist document arguing that states could resist unconstitutional federal legislation.' },
    ],
    modernEssay: {
      title: 'What Would Madison Think If He Had Listened to the Anti-Federalists From the Start?',
      paragraphs: [
        'James Madison is the most tragic figure in American political history. He designed the Constitution, argued passionately for its ratification, and then watched in horror as Hamilton used his document to justify everything Madison had promised it would prevent. Within five years of ratification, Madison was writing resolutions defending states\' rights against federal overreach — essentially becoming the Anti-Federalist he had argued against.',
        'If Madison had listened to the Anti-Federalists from the beginning — to Brutus, to the Federal Farmer, to Patrick Henry — the Constitution would have been a fundamentally different document. Smaller congressional districts. A weaker executive. Explicit limits on federal taxation and spending. No Necessary and Proper Clause. No Supremacy Clause giving federal law automatic priority over state constitutions. The Anti-Federalists were right about every structural flaw Madison later came to regret.',
        'Madison would look at the modern Anti-Federalist Party and feel the bitter vindication of a man who was warned and did not listen in time. He would see the surveillance state and remember that he wrote the Fourth Amendment to prevent exactly this. He would see executive governance by decree and remember that he designed three co-equal branches to prevent exactly this. He would see corporate capture of Congress and remember that he designed small districts to prevent exactly this.',
        'The most powerful argument for the Anti-Federalist Party is Madison himself. The man who wrote the Constitution became its most eloquent critic. He admitted, through his actions if not always his words, that the Anti-Federalists had been right. The Bill of Rights was their victory. The Virginia Resolutions were their vindication. Madison\'s entire post-ratification career was a confession that the Anti-Federalists saw what he had missed.',
        'If Madison could speak to the modern Anti-Federalist Party, he would say: "I gave you the tools. The Bill of Rights, the Tenth Amendment, the principle of enumerated powers — these were concessions to Anti-Federalist wisdom. Use them. Enforce them. Build the decentralized republic I should have designed from the beginning."',
      ],
    },
  },
  {
    category: 'persuaded',
    slug: 'george-washington',
    name: 'George Washington',
    born: '1732',
    died: '1799',
    title: 'Commander-in-Chief, 1st President',
    penName: '',
    portrait: '',
    tagline: 'He warned us about everything we became.',
    biography: 'George Washington presided over the Constitutional Convention and became the first president. He is claimed by Federalists as their greatest champion. But Washington\'s Farewell Address — his final political statement — reads like an Anti-Federalist manifesto. He warned against political parties, permanent foreign alliances, and the accumulation of national debt. He voluntarily surrendered power after two terms, establishing the precedent that no person should hold executive authority indefinitely.',
    contributions: [
      'Voluntarily surrendered presidential power — establishing the anti-monarchical precedent',
      'His Farewell Address warned against political parties, foreign entanglements, and national debt',
      'Rejected the title "Your Majesty" in favor of "Mr. President"',
      'Returned to private life, demonstrating that citizen-governance is superior to professional politics',
      'His warnings about faction and concentrated power align perfectly with Anti-Federalist principles',
    ],
    keyWritings: [
      { title: 'Farewell Address', year: '1796', significance: 'Warning against political parties, foreign alliances, and national debt — every warning has been vindicated by history.' },
    ],
    modernEssay: {
      title: 'What Would Washington Think If He Saw What Hamilton Built?',
      paragraphs: [
        'George Washington\'s Farewell Address is the most prophetic document in American history. He warned against "the baneful effects of the spirit of party" — and today, partisan polarization has paralyzed the government he founded. He warned against "permanent alliances with any portion of the foreign world" — and today, the United States maintains 800 military bases in 70 countries. He warned against accumulating national debt — which now exceeds $34 trillion. Washington warned us. We did not listen.',
        'Washington would be horrified by what the presidency became. He deliberately set modest precedents — two terms, simple titles, civilian authority. Every subsequent expansion of presidential power violates his vision. Executive orders, signing statements, emergency powers, the nuclear football — Washington would see these as the trappings of the monarchy he fought to abolish.',
        'If Washington had sided with the Anti-Federalists — and his Farewell Address suggests his sympathies were closer to theirs than to Hamilton\'s — the American experiment would look radically different. A weaker executive. No standing army. No political parties. No permanent foreign entanglements. No national debt. Everything Washington warned against in 1796 is now the foundation of American governance.',
        'The modern Anti-Federalist Party\'s rejection of personality-driven politics would resonate with Washington more than anything else. He understood that the republic depended on no person being irreplaceable. He walked away from power voluntarily — the single most important act of any American president. The Anti-Federalist Party\'s principle-driven, leaderless structure embodies what Washington modeled.',
        'If Washington saw the modern Anti-Federalist Party, he would recognize kindred spirits — not in policy details, but in the fundamental commitment to citizen governance over professional politics. He would say: "I gave up power so that no one would accumulate it. Build the republic I imagined — one where no person, no party, and no corporation is more powerful than the community it serves."',
      ],
    },
  },
  {
    category: 'persuaded',
    slug: 'benjamin-franklin',
    name: 'Benjamin Franklin',
    born: '1706',
    died: '1790',
    title: 'Diplomat, Scientist, Statesman',
    penName: '',
    portrait: '',
    tagline: 'A republic, if you can keep it.',
    biography: 'Benjamin Franklin signed the Constitution, but his support was deeply ambivalent. He advocated for a plural executive (no single president), a unicameral legislature, and warned that the Constitution would "end in despotism" once the people became "corrupted" enough to need despotic governance. His famous remark upon leaving the Convention — "A republic, if you can keep it" — was not optimism. It was a warning.',
    contributions: [
      'Advocated for a plural executive — no single person should hold presidential power',
      'Favored a unicameral legislature — simpler, more accountable government',
      'Warned that the republic would eventually "end in despotism"',
      'His "if you can keep it" remark acknowledged the fragility of the constitutional experiment',
      'Championed practical, community-based governance throughout his career',
    ],
    keyWritings: [
      { title: 'Closing Speech at the Constitutional Convention', year: '1787', significance: 'Urged delegates to sign despite his reservations, but warned prophetically that the system contained the seeds of its own destruction.' },
    ],
    modernEssay: {
      title: 'What Would Franklin Think If He Saw We Couldn\'t Keep It?',
      paragraphs: [
        'Benjamin Franklin\'s most famous words were not a celebration. "A republic, if you can keep it" was a conditional statement — and Franklin suspected the condition would not be met. He warned the Convention that the Constitution would eventually produce despotic government, "as other forms have done before it, when the people shall become so corrupted as to need despotic government." He was the most pessimistic signer of the Constitution.',
        'Franklin wanted a plural executive — a committee of leaders rather than a single president. He understood that concentrating executive power in one person created an irresistible target for corruption and authoritarianism. Every imperial presidency since — from Lincoln\'s suspension of habeas corpus to Trump\'s executive orders — vindicates Franklin\'s position. The single executive was the Constitution\'s most dangerous design choice.',
        'Franklin was the most practical of the founders. He was an inventor, a scientist, a community organizer. He founded libraries, fire departments, postal systems, and universities. He believed that governance should be local, practical, and focused on improving people\'s daily lives. The modern Anti-Federalist Party\'s emphasis on community infrastructure — municipal broadband, community banking, local energy cooperatives — is Franklinian governance.',
        'If Franklin could see modern America, he would say: "You couldn\'t keep it." The republic he warned about losing has been replaced by an imperial presidency, a corporate-captured Congress, and a surveillance state that would make King George III blush. But he would also see hope in the Anti-Federalist resurgence — because Franklin was, above all, a pragmatist. If the old republic failed, build a new one. Locally.',
        'Franklin would be the Anti-Federalist Party\'s chief technologist. He would build community broadband networks, design local governance apps, and create practical tools for direct democracy. He would not write manifestos — he would build things. And he would remind us that the greatest act of patriotism is not defending a failed system. It is building a better one.',
      ],
    },
  },
  {
    category: 'persuaded',
    slug: 'thomas-paine',
    name: 'Thomas Paine',
    born: '1737',
    died: '1809',
    title: 'Revolutionary Author',
    penName: '',
    portrait: '',
    tagline: 'These are the times that try men\'s souls.',
    biography: 'Thomas Paine\'s "Common Sense" was the most influential pamphlet of the American Revolution — it turned colonial grievances into a revolutionary movement. Paine was not at the Constitutional Convention, but his political philosophy was deeply decentralist. He believed in direct democracy, redistribution of wealth through local mechanisms, and the right of every generation to remake its own government. He became increasingly radical with age, and his later works were so threatening to established power that he was abandoned by most of his former allies.',
    contributions: [
      'Authored "Common Sense" — the pamphlet that ignited the Revolution',
      'His "Crisis" papers sustained revolutionary morale during the war\'s darkest periods',
      'Advocated for direct democracy and generational sovereignty',
      'Proposed proto-social-security and public education systems funded locally',
      'His radicalism made him too dangerous for both Federalists and moderate Anti-Federalists',
    ],
    keyWritings: [
      { title: 'Common Sense', year: '1776', significance: 'Transformed colonial discontent into revolutionary conviction. Sold 500,000 copies — the equivalent of 50 million in today\'s population.' },
      { title: 'The Rights of Man', year: '1791', significance: 'Argued that every generation has the right to govern itself — no dead generation can bind a living one.' },
      { title: 'Agrarian Justice', year: '1797', significance: 'Proposed a wealth redistribution system funded by inheritance taxes — radical for its time, common sense for ours.' },
    ],
    modernEssay: {
      title: 'What Would Paine Think About a Movement That Carries His Spirit?',
      paragraphs: [
        'Thomas Paine would not just support the modern Anti-Federalist Party — he would consider it 235 years overdue. Paine was the most radical of the founders, and his radicalism was structural. He did not believe any government had permanent legitimacy. He did not believe any constitution should last longer than a generation. He believed that the earth belongs to the living, and that every community has the absolute right to govern itself.',
        'Paine would write a new "Common Sense" for the modern era. It would be titled something like "Common Sense II: On the Failure of the American Experiment." It would argue that the Constitution has become exactly what the British monarchy was — a distant, unaccountable power structure that serves its own interests while claiming to represent the people. It would sell millions of copies. It would terrify the establishment.',
        'Paine\'s vision of generational sovereignty is the Anti-Federalist Party\'s most radical and most important principle. No generation should be governed by the decisions of dead people. The Constitution was written by men who owned slaves, denied women the vote, and could not have imagined the internet, nuclear weapons, or artificial intelligence. Treating their 18th-century document as sacred text is not patriotism — it is ancestor worship.',
        'Paine was abandoned by the establishment because he was too honest. Adams called him a "mongrel." Washington refused to help him when he was imprisoned in France. He died in poverty, with only six people attending his funeral. The establishment always destroys its most honest voices. The Anti-Federalist Party exists to ensure that Paine\'s honesty, not his abandonment, is the lesson history remembers.',
        'If Thomas Paine were alive today, he would be the most dangerous person in America. Not because he would advocate violence — Paine despised violence. But because he would say, clearly and simply, what everyone already knows: the system is broken, the Constitution has failed, and the only solution is to rebuild from the ground up, community by community. He would say it with such clarity that it could not be ignored. And that is what the powerful fear most.',
      ],
    },
  },
];
