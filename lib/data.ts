export type RecommendationLevel = 'A' | 'B' | 'C' | 'D';
export type DDStatus = 'Complete' | 'In review' | 'Pending' | 'Rejected';
export type Specialty = 'Reuse' | 'Recycling' | 'Mixed';
export type Region = 'EMEA' | 'Americas' | 'Asia';
export type UserRole = 'Admin' | 'Analyst' | 'Maison' | 'Partner';

export interface Partner {
  id: number;
  name: string;
  legalName: string;
  country: string;
  region: Region;
  specialty: Specialty;
  level: RecommendationLevel;
  ddStatus: DDStatus;
  reuseScore: number;
  recyclingScore: number;
  totalScore: number;
  description: string;
  website: string;
  certifications: string[];
  experience: string;
  capacity: string;
  materials: string[];
  traceability: string;
  reporting: string;
  submittedAt: string;
  analystNotes: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
}

export const DEMO_USERS: DemoUser[] = [
  { id: '1', name: 'Alexandre Moreau', email: 'admin@groupe-luxe.com',   role: 'Admin',   initials: 'AM' },
  { id: '2', name: 'Sarah Chen',        email: 'analyst@groupe-luxe.com', role: 'Analyst', initials: 'SC' },
  { id: '3', name: 'Thomas Lefebvre',   email: 'maison@groupe-luxe.com',  role: 'Maison',  initials: 'TL' },
  { id: '4', name: 'EcoLoop Partner',   email: 'partner@ecoloop.de',      role: 'Partner', initials: 'EP' },
];

export const PARTNERS: Partner[] = [
  { id:1, name:'EcoLoop GmbH', legalName:'EcoLoop Kreislaufwirtschaft GmbH', country:'Germany', region:'EMEA', specialty:'Reuse', level:'A', ddStatus:'Complete', reuseScore:88, recyclingScore:72, totalScore:91, description:'Circular logistics and reuse platform specialising in luxury goods end-of-life management across Central Europe.', website:'https://ecoloop.de', certifications:['ISO 14001','Cradle to Cradle','EMAS'], experience:'10+ years', capacity:'100–200 t/month', materials:['Textiles','Leather','Packaging','Metals'], traceability:'Blockchain-based tracking', reporting:'Automated dashboards', submittedAt:'2024-11-15', analystNotes:'Exemplary traceability infrastructure. Highly recommended for leather and textile streams.' },
  { id:2, name:'Renova Textiles', legalName:'Renova Textiles SAS', country:'France', region:'EMEA', specialty:'Recycling', level:'B', ddStatus:'Complete', reuseScore:62, recyclingScore:85, totalScore:78, description:'Industrial-scale textile fibre recycling with a dedicated high-end brand processing unit.', website:'https://renova-textiles.fr', certifications:['ISO 14001','GOTS'], experience:'5–10 years', capacity:'50–100 t/month', materials:['Textiles','Natural fibres'], traceability:'Digital system (proprietary)', reporting:'Regular reports available', submittedAt:'2024-11-20', analystNotes:'Strong fibre recovery rates. Recommended for textile waste streams.' },
  { id:3, name:'Mano Verde SRL', legalName:'Mano Verde Economia Circolare SRL', country:'Italy', region:'EMEA', specialty:'Mixed', level:'A', ddStatus:'Complete', reuseScore:90, recyclingScore:88, totalScore:92, description:'Full-spectrum circular economy operator with luxury sector expertise across Italy and Southern Europe.', website:'https://manoverde.it', certifications:['ISO 14001','ISO 9001','Cradle to Cradle'], experience:'10+ years', capacity:'200+ t/month', materials:['Textiles','Leather','Metals','Packaging','Glass'], traceability:'Blockchain-based tracking', reporting:'Automated dashboards', submittedAt:'2024-10-28', analystNotes:'Best-in-class operator. Strategic partner candidate.' },
  { id:4, name:'Nordic Reclaim AB', legalName:'Nordic Reclaim Aktiebolag', country:'Sweden', region:'EMEA', specialty:'Recycling', level:'B', ddStatus:'In review', reuseScore:55, recyclingScore:80, totalScore:74, description:'Precious metal and component recovery specialist serving the Nordic and Benelux markets.', website:'https://nordicreclaim.se', certifications:['ISO 14001'], experience:'5–10 years', capacity:'50–100 t/month', materials:['Metals','Electronics','Packaging'], traceability:'Digital system (proprietary)', reporting:'Regular reports available', submittedAt:'2024-12-01', analystNotes:'Awaiting updated insurance documentation.' },
  { id:5, name:'CircleWorks Ltd', legalName:'CircleWorks Limited', country:'United Kingdom', region:'EMEA', specialty:'Reuse', level:'C', ddStatus:'Pending', reuseScore:68, recyclingScore:42, totalScore:58, description:'Product refurbishment and redistribution network across the UK and Ireland.', website:'https://circleworks.co.uk', certifications:['ISO 14001'], experience:'2–5 years', capacity:'10–50 t/month', materials:['Textiles','Leather'], traceability:'Manual tracking', reporting:'Basic annual report', submittedAt:'2024-12-08', analystNotes:'Promising reuse capabilities but reporting maturity needs improvement.' },
  { id:6, name:'ReSource Americas', legalName:'ReSource Americas Inc.', country:'United States', region:'Americas', specialty:'Mixed', level:'B', ddStatus:'Complete', reuseScore:74, recyclingScore:78, totalScore:80, description:'Waste-to-value broker and circular logistics operator across North America.', website:'https://resourceamericas.com', certifications:['ISO 14001','R2/RIOS'], experience:'5–10 years', capacity:'100–200 t/month', materials:['Textiles','Metals','Packaging','Electronics'], traceability:'Digital system (proprietary)', reporting:'Regular reports available', submittedAt:'2024-11-05', analystNotes:'Solid North America coverage. Suitable for US operations.' },
  { id:7, name:'Ciclo Limpio SA', legalName:'Ciclo Limpio Sociedad Anónima', country:'Mexico', region:'Americas', specialty:'Recycling', level:'C', ddStatus:'Pending', reuseScore:40, recyclingScore:65, totalScore:55, description:'Plastic and metal recycling operator serving Central America and Mexico.', website:'https://ciclolimpio.mx', certifications:[], experience:'2–5 years', capacity:'10–50 t/month', materials:['Plastics','Metals'], traceability:'Manual tracking', reporting:'No reporting', submittedAt:'2024-12-10', analystNotes:'Requires compliance documentation before activation.' },
  { id:8, name:'Verde Loop Corp', legalName:'Verde Loop Corporation', country:'Brazil', region:'Americas', specialty:'Reuse', level:'D', ddStatus:'Rejected', reuseScore:30, recyclingScore:22, totalScore:32, description:'Pre-commercial stage reuse network in Brazil. Limited operational track record.', website:'https://verdeloop.com.br', certifications:[], experience:'< 2 years', capacity:'< 10 t/month', materials:['Textiles'], traceability:'None', reporting:'No reporting', submittedAt:'2024-11-30', analystNotes:'Insufficient track record and documentation. Rejected at due diligence.' },
  { id:9, name:'Kairos Circular', legalName:'Kairos Circular Pte. Ltd.', country:'Singapore', region:'Asia', specialty:'Mixed', level:'A', ddStatus:'Complete', reuseScore:85, recyclingScore:87, totalScore:90, description:'Luxury circular economy specialist for Asia-Pacific, with offices in Singapore, Tokyo, and Hong Kong.', website:'https://kairoscircular.sg', certifications:['ISO 14001','ISO 9001','Cradle to Cradle'], experience:'10+ years', capacity:'100–200 t/month', materials:['Textiles','Leather','Metals','Packaging'], traceability:'Blockchain-based tracking', reporting:'Automated dashboards', submittedAt:'2024-10-15', analystNotes:'Top-tier APAC operator. Full recommendation.' },
  { id:10, name:'EcoAsia Partners', legalName:'EcoAsia Partners K.K.', country:'Japan', region:'Asia', specialty:'Reuse', level:'B', ddStatus:'In review', reuseScore:78, recyclingScore:60, totalScore:73, description:'High-end product reuse and refurbishment specialist in Japan and Korea.', website:'https://ecoasia-partners.jp', certifications:['ISO 14001'], experience:'5–10 years', capacity:'50–100 t/month', materials:['Textiles','Leather','Packaging'], traceability:'Digital system (proprietary)', reporting:'Regular reports available', submittedAt:'2024-11-22', analystNotes:'Pending verification of governance documentation.' },
  { id:11, name:'GreenChain HK', legalName:'GreenChain Limited', country:'Hong Kong', region:'Asia', specialty:'Recycling', level:'C', ddStatus:'Pending', reuseScore:48, recyclingScore:68, totalScore:60, description:'Supply chain waste recycling and traceability services across Greater China.', website:'https://greenchain.hk', certifications:['ISO 14001'], experience:'2–5 years', capacity:'10–50 t/month', materials:['Packaging','Metals','Plastics'], traceability:'Digital system (proprietary)', reporting:'Basic annual report', submittedAt:'2024-12-05', analystNotes:'Awaiting compliance and insurance documentation.' },
  { id:12, name:'Renewal Systems KR', legalName:'Renewal Systems Co., Ltd.', country:'South Korea', region:'Asia', specialty:'Mixed', level:'B', ddStatus:'Complete', reuseScore:70, recyclingScore:75, totalScore:76, description:'Electronics and textile circular systems provider in South Korea and South-East Asia.', website:'https://renewalsystems.kr', certifications:['ISO 14001','K-CERT'], experience:'5–10 years', capacity:'50–100 t/month', materials:['Electronics','Textiles','Metals'], traceability:'Digital system (proprietary)', reporting:'Regular reports available', submittedAt:'2024-11-10', analystNotes:'Reliable operator with good APAC reach.' },
];

export const SCORING_CONFIG = {
  criteria: [
    { id:'circularExpertise',    label:'Circularity expertise',     maxPoints:20 },
    { id:'technicalCapabilities',label:'Technical capabilities',    maxPoints:15 },
    { id:'traceabilitySystem',   label:'Traceability system',       maxPoints:15 },
    { id:'reportingMaturity',    label:'Reporting maturity',        maxPoints:10 },
    { id:'legalRegistration',    label:'Legal registration',        maxPoints:10 },
    { id:'complianceDocs',       label:'Compliance documentation',  maxPoints:10 },
    { id:'insurance',            label:'Insurance certificate',     maxPoints:10 },
    { id:'governance',           label:'Governance transparency',   maxPoints:10 },
  ],
  thresholds:{ A:85, B:70, C:50, D:0 },
};

export function getRecommendationLevel(score:number): RecommendationLevel {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export function scoreColor(score:number): string {
  if (score >= 85) return '#2C1A0E';
  if (score >= 70) return '#6B4C35';
  if (score >= 50) return '#C4A98E';
  return '#D9CAB8';
}

export const FORM_STEPS = ['Company','Coverage','Circularity','Technical','Logistics','Traceability','Documents','Review'];

export const AUDIT_LOG = [
  { id:1, partnerId:1, actor:'Sarah Chen',   action:'Score calculated — recommendation set to A', timestamp:'2 days ago',  type:'score' },
  { id:2, partnerId:1, actor:'Sarah Chen',   action:'Due diligence status updated to Complete',   timestamp:'5 days ago',  type:'status' },
  { id:3, partnerId:1, actor:'EcoLoop GmbH', action:'Qualification form submitted',               timestamp:'8 days ago',  type:'submit' },
  { id:4, partnerId:1, actor:'EcoLoop GmbH', action:'Account created',                            timestamp:'10 days ago', type:'create' },
  { id:5, partnerId:3, actor:'Sarah Chen',   action:'Score calculated — recommendation set to A', timestamp:'3 days ago',  type:'score' },
  { id:6, partnerId:3, actor:'Sarah Chen',   action:'Due diligence status set to Complete',       timestamp:'6 days ago',  type:'status' },
  { id:7, partnerId:3, actor:'Mano Verde SRL','action':'Qualification form submitted',            timestamp:'9 days ago',  type:'submit' },
];
