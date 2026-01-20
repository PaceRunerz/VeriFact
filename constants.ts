
import { TrendingFact } from "./types";

export const COLORS = {
  primary: '#0A192F',
  secondary: '#64FFDA',
  verified: '#10B981',
  misinformation: '#EF4444',
  suspicious: '#F59E0B'
};

export const MOCK_TRENDING: TrendingFact[] = [
  {
    id: 'm1',
    title: 'Deepfake Election Official Audio',
    claim: 'Viral audio clip claiming an election official is discarding ballots.',
    verdict: 'Fake',
    sourceName: 'VeriFact Archive',
    sourceUrl: 'https://reuters.com'
  },
  {
    id: 'm2',
    title: 'Miracle Health Supplement Scams',
    claim: 'Social media posts claiming new "Blue Tonic" reverses aging instantly.',
    verdict: 'Misleading',
    sourceName: 'Health Watch',
    sourceUrl: 'https://apnews.com'
  },
  {
    id: 'm3',
    title: 'Mars Colonization Timeline 2026',
    claim: 'Claim that human landing is confirmed for early 2026.',
    verdict: 'Debunked',
    sourceName: 'Science Fact',
    sourceUrl: 'https://snopes.com'
  }
];
