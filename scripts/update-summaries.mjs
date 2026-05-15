/**
 * Generate unique summaries for each paper based on actual content
 * Run: node scripts/update-summaries.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAPERS_PATH = path.join(__dirname, '..', 'src', 'data', 'papers.json');

const papers = JSON.parse(fs.readFileSync(PAPERS_PATH, 'utf8'));

// Unique summaries for Brutus series
const BRUTUS_SUMMARIES = {
  'brutus-1': 'Argues that the proposed Constitution will inevitably consolidate the states into one republic, destroying local liberty. Warns that a free republic cannot govern a territory as vast as the United States.',
  'brutus-2': 'Examines the sweeping powers granted by the "necessary and proper" clause and argues that the Constitution leaves no meaningful limits on federal authority.',
  'brutus-3': 'Contends that the taxing power of Congress is unlimited and will inevitably swallow the ability of states to raise their own revenue.',
  'brutus-4': 'Argues that Congress\'s power of direct taxation will render state governments financially impotent and unable to sustain themselves.',
  'brutus-5': 'Warns that the power to raise standing armies in peacetime is dangerous to liberty and inconsistent with a free republic.',
  'brutus-6': 'Examines the dangers of Congress\'s power to organize and arm the militia, arguing it will be used to create a national force hostile to the states.',
  'brutus-7': 'Analyzes the insufficient representation in the proposed House and Senate, arguing they cannot reflect the diversity of interests across the states.',
  'brutus-8': 'Continues the critique of representation, arguing that only the wealthy and well-connected will be elected to the proposed national legislature.',
  'brutus-9': 'Argues that the small number of representatives will create an aristocratic body detached from the people, serving the interests of the few.',
  'brutus-10': 'Examines the dangers of the Senate\'s power and its role in creating an aristocratic class with permanent control over government.',
  'brutus-11': 'Begins the critique of the proposed judiciary, arguing it will extend federal power at the expense of the states through expansive interpretation.',
  'brutus-12': 'Continues the analysis of the judiciary, warning that federal courts will make law through broad construction and equity jurisdiction.',
  'brutus-13': 'Argues that the Supreme Court\'s appellate jurisdiction over both law and fact will destroy the right to trial by jury.',
  'brutus-14': 'Warns that the independence of the judiciary, combined with life tenure and no accountability, will create an unchecked aristocratic power.',
  'brutus-15': 'Contends that the proposed judiciary will be superior to the legislature and will exercise the power of judicial review without restraint.',
  'brutus-16': 'Final essay. Argues that the judiciary will progressively extend its power until it has consumed the authority of the states and the liberty of the people.',
};

const FEDERAL_FARMER_SUMMARIES = {
  'federal-farmer-1': 'Warns that the Constitution will create a consolidated government destroying state sovereignty. Calls for careful deliberation before ratification.',
  'federal-farmer-2': 'Argues that the proposed government is neither truly federal nor truly national, but a dangerous hybrid that leaves the states without real power.',
  'federal-farmer-3': 'Examines the inadequacy of representation and argues that the proposed Congress will be dominated by the "natural aristocracy."',
  'federal-farmer-4': 'Analyzes the Senate and argues its structure will create an aristocratic body with too much power over treaties, appointments, and legislation.',
  'federal-farmer-5': 'Contends that the small House of Representatives cannot adequately represent the diverse interests and sentiments of the American people.',
  'federal-farmer-6': 'Proposes that representation must include all classes of people — merchants, farmers, artisans — not just the elite.',
  'federal-farmer-7': 'Argues for a larger House and a more accountable Senate to prevent the government from becoming an instrument of aristocratic control.',
  'federal-farmer-8': 'Examines the executive branch and warns that the President\'s powers are dangerously broad, especially regarding the military and pardons.',
  'federal-farmer-9': 'Discusses the need for a bill of rights, arguing that even in a federal system, fundamental liberties must be explicitly protected.',
  'federal-farmer-10': 'Continues the argument for a bill of rights, citing freedom of the press, religion, and assembly as essential safeguards.',
  'federal-farmer-11': 'Argues passionately for the right to trial by jury in civil cases, calling it the cornerstone of free government.',
  'federal-farmer-12': 'Examines the judiciary and warns that federal courts will gradually encroach upon the jurisdiction of state courts.',
  'federal-farmer-13': 'Analyzes Congress\'s powers of taxation and argues they are too broad, threatening the financial independence of the states.',
  'federal-farmer-14': 'Discusses the militia and standing armies, warning that a national military establishment will be used to enforce federal authority against the people.',
  'federal-farmer-15': 'Examines the powers given to the executive and argues they create a quasi-monarchical office with insufficient checks.',
  'federal-farmer-16': 'Proposes specific amendments to the Constitution to protect liberty, including explicit limits on federal power.',
  'federal-farmer-17': 'Continues proposing amendments and argues that ratification should be conditional upon the adoption of a bill of rights.',
  'federal-farmer-18': 'Final letter. Makes a comprehensive case for conditional ratification with amendments to protect the rights and powers of states and individuals.',
};

const CENTINEL_SUMMARIES = {
  'centinel-1': 'Argues that the system of checks and balances in the Constitution is illusory and will lead to tyranny. Warns that the Convention exceeded its authority.',
  'centinel-2': 'Attacks the Federalists for manipulating public opinion and suppressing debate during the ratification process.',
  'centinel-3': 'Accuses supporters of the Constitution of conspiring to rush ratification before the people can understand the dangers of the new system.',
  'centinel-4': 'Denounces the proceedings of the Pennsylvania ratifying convention and argues the Constitution was adopted through fraud.',
  'centinel-5': 'Warns that the proposed government will inevitably become a tyranny because it lacks sufficient restraints on power.',
  'centinel-6': 'Argues that the judiciary will become a tool of aristocratic control, extending federal power at the expense of the people.',
  'centinel-7': 'Criticizes the lack of a bill of rights and argues that fundamental liberties are left unprotected under the new Constitution.',
  'centinel-8': 'Examines the dangers of the treaty power and the Senate\'s role in foreign affairs as a threat to popular sovereignty.',
  'centinel-9': 'Argues that the standing army clause will enable the federal government to suppress domestic opposition by force.',
  'centinel-10': 'Warns that the "necessary and proper" clause gives Congress virtually unlimited legislative power.',
  'centinel-11': 'Contends that the Constitution creates a government of the few over the many, contradicting republican principles.',
  'centinel-12': 'Discusses the dangers of consolidation and argues the federal government will absorb all state functions over time.',
  'centinel-13': 'Examines the inadequacy of representation and the impossibility of a single legislature governing so vast a territory.',
  'centinel-14': 'Argues that the executive powers combined with Senate influence create the foundation for an elected monarchy.',
  'centinel-15': 'Warns that the taxing power will be used to create dependency and submission rather than to serve the public good.',
  'centinel-16': 'Argues that the proposed judiciary is designed to be independent of the people and accountable only to the aristocratic class.',
  'centinel-17': 'Contends that the militia clause will be used to disarm the people and centralize military power in the federal government.',
  'centinel-18': 'Final substantive argument. Reviews all the objections and argues the Constitution must be amended before ratification.',
  'centinel-19': 'Continues the case for pre-ratification amendments, arguing that post-ratification change will be nearly impossible.',
  'centinel-20': 'Warns that the power of the purse combined with the power of the sword gives the federal government total dominion.',
  'centinel-21': 'Argues that the people\'s right to alter or abolish government is meaningless without explicit constitutional protections.',
  'centinel-22': 'Examines the commercial powers of Congress and warns they will be used to benefit Northern merchants at Southern expense.',
  'centinel-23': 'Attacks the clause allowing Congress to regulate its own elections as an invitation to perpetual self-appointment.',
  'centinel-24': 'Final essay. A passionate appeal to the people of Pennsylvania to reject the Constitution until a bill of rights is secured.',
};

const CATO_SUMMARIES = {
  'cato-1': 'Urges New York citizens to examine the proposed Constitution carefully before ratifying, warning against hasty adoption.',
  'cato-2': 'Argues that the proposed Constitution is not a revision of the Articles but a wholly new system that concentrates dangerous power.',
  'cato-3': 'Warns that the executive will become an elected king with vast patronage powers, threatening republican government.',
  'cato-4': 'Examines the dangers of the presidential veto and argues it gives the executive a legislative role inconsistent with separation of powers.',
  'cato-5': 'Argues that the President\'s treaty power, combined with Senate advice and consent, creates a dangerous alliance of executive and aristocratic power.',
  'cato-6': 'Warns that the power to appoint judges and officers creates a patronage system that will corrupt the republic.',
  'cato-7': 'Final essay. Summarizes the dangers of the executive branch and calls for amendments to limit presidential power.',
};

const AGRIPPA_SUMMARIES = {
  'agrippa-1': 'Argues that the diversity of American states in climate, commerce, and interest makes a large consolidated republic impractical.',
  'agrippa-2': 'Contends that Massachusetts has thrived under its own constitution and does not need a powerful national government.',
  'agrippa-3': 'Warns that uniform commercial regulations will harm states with different economic interests and trading patterns.',
  'agrippa-4': 'Argues that giving Congress power over commerce will lead to monopolies and destroy the prosperity of trading states.',
  'agrippa-5': 'Examines the dangers of federal taxation and argues it will burden the common people while enriching federal office-holders.',
  'agrippa-6': 'Contends that the regulation of commerce should remain with the states to preserve local economic freedom.',
  'agrippa-7': 'Warns that the Constitution gives Congress power to interfere with state religious establishments and local customs.',
  'agrippa-8': 'Argues that trial by jury and other common law protections are left dangerously unprotected by the Constitution.',
  'agrippa-9': 'Proposes that the Articles of Confederation should be amended rather than replaced with an entirely new system.',
  'agrippa-10': 'Examines the inadequacy of the proposed system of representation and argues it cannot reflect the popular will.',
  'agrippa-11': 'Argues for explicit constitutional protections for freedom of conscience and against religious tests for office.',
  'agrippa-12': 'Warns that the commercial and navigation powers of Congress will create sectional conflicts that threaten the union.',
  'agrippa-13': 'Contends that a bill of rights is essential and proposes specific amendments to protect individual liberties.',
  'agrippa-14': 'Argues that the Constitution should explicitly guarantee freedom of the press, religion, and the right to bear arms.',
  'agrippa-15': 'Makes the case for reserving all powers not expressly delegated to the states and the people.',
  'agrippa-16': 'Final substantive essay. Proposes a comprehensive set of amendments and argues for conditional ratification.',
  'agrippa-17': 'Continues the argument for conditional ratification with specific protections for civil liberties.',
  'agrippa-18': 'Final essay. Summarizes all objections and makes a final appeal for amendments before ratification is complete.',
};

const DEWITT_SUMMARIES = {
  'john-dewitt-1': 'Warns Boston citizens against the proposed Constitution, arguing it lacks a bill of rights and grants unchecked power to the federal government.',
  'john-dewitt-2': 'Argues that the absence of a bill of rights leaves the people vulnerable to government oppression and violates the principles of the Revolution.',
};

const ALL_SUMMARIES = {
  ...BRUTUS_SUMMARIES,
  ...FEDERAL_FARMER_SUMMARIES,
  ...CENTINEL_SUMMARIES,
  ...CATO_SUMMARIES,
  ...AGRIPPA_SUMMARIES,
  ...DEWITT_SUMMARIES,
};

let updated = 0;
for (const paper of papers) {
  if (ALL_SUMMARIES[paper.id]) {
    paper.summary = ALL_SUMMARIES[paper.id];
    updated++;
  }
}

fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
console.log(`Updated ${updated} summaries`);
