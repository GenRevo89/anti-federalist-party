'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { searchCities, CityData } from '@/app/actions/searchCities';

export default function CitySearch({ defaultCities }: { defaultCities: CityData[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityData[]>(defaultCities);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(defaultCities);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const matches = await searchCities(query);
        setResults(matches);
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, defaultCities]);

  const isDefaultView = query.trim().length < 2;

  return (
    <>
      {/* ─── HERO + SEARCH ─── */}
      <section style={{
        paddingTop: '10rem',
        paddingBottom: '5rem',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              color: '#2EC4B6',
              marginBottom: '1.5rem',
            }}>National Network • 29,880 Municipalities</p>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: '#F0EDE6',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              Find Your <em style={{ fontStyle: 'italic', color: '#2EC4B6' }}>Chapter</em>
            </h1>

            <p style={{
              color: 'rgba(240, 237, 230, 0.6)',
              fontSize: '1.15rem',
              maxWidth: '36rem',
              margin: '0 auto 3.5rem',
              lineHeight: 1.7,
            }}>
              Search any city or town in the United States to connect with your local Anti-Federalist vanguard.
            </p>

            {/* ── Search Bar ── */}
            <div style={{ maxWidth: '44rem', margin: '0 auto', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '9999px',
                background: isFocused
                  ? 'linear-gradient(135deg, rgba(46,196,182,0.4), rgba(13,115,119,0.2), rgba(46,196,182,0.4))'
                  : 'transparent',
                filter: 'blur(12px)',
                transition: 'all 0.6s ease',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(10, 10, 18, 0.9)',
                border: isFocused ? '1px solid rgba(46, 196, 182, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '9999px',
                padding: '0.35rem 1rem 0.35rem 1.75rem',
                boxShadow: isFocused
                  ? '0 0 0 1px rgba(46,196,182,0.15), 0 8px 40px rgba(0,0,0,0.5)'
                  : '0 4px 24px rgba(0,0,0,0.4)',
                transition: 'all 0.4s ease',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isFocused ? '#2EC4B6' : 'rgba(240,237,230,0.3)'} strokeWidth="2" style={{ flexShrink: 0, marginRight: '1rem', transition: 'stroke 0.3s' }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search 29,880 cities…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: '#F0EDE6',
                    fontSize: '1.1rem',
                    height: '3.25rem',
                    outline: 'none',
                    letterSpacing: '0.01em',
                  }}
                />
                {isSearching && (
                  <div style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    border: '2px solid #2EC4B6',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    flexShrink: 0,
                    marginRight: '0.75rem',
                  }} />
                )}
                {!isSearching && query.length > 0 && (
                  <button
                    onClick={() => setQuery('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(240,237,230,0.4)',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: '0 0.75rem',
                      lineHeight: 1,
                    }}
                  >×</button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── RESULTS GRID ─── */}
      <section style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="content-wrap">
          <ScrollReveal>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-display)',
                color: '#F0EDE6',
                borderLeft: '3px solid #2EC4B6',
                paddingLeft: '1rem',
                fontWeight: 700,
              }}>
                {isDefaultView ? 'Major Hubs' : 'Search Results'}
              </h2>
              {!isDefaultView && (
                <span style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {results.length} found
                </span>
              )}
            </div>
          </ScrollReveal>

          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'rgba(240,237,230,0.4)' }}>
              <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No municipalities found for &ldquo;{query}&rdquo;</p>
              <p style={{ fontSize: '0.85rem' }}>Try searching by city name or checking your spelling.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {results.map((city, i) => (
                <ScrollReveal key={`${city.state}-${city.countySlug}-${city.slug}`} delay={(i % 10) * 0.05} className="h-full">
                  <Link href={`/chapters/${city.state}/${city.countySlug}/${city.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                    <div
                      style={{
                        height: '100%',
                        padding: '1.75rem 2rem 1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(46, 196, 182, 0.12)',
                        background: 'rgba(13, 115, 119, 0.06)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.4s ease',
                        cursor: 'pointer',
                        boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
                      }}
                      className="city-card"
                    >
                      <div>
                        <h3 style={{
                          fontSize: '1.35rem',
                          fontWeight: 700,
                          color: '#F0EDE6',
                          marginBottom: '0.4rem',
                          letterSpacing: '-0.01em',
                          fontFamily: 'var(--font-display)',
                        }}>{city.name}</h3>
                        <p style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: '#2EC4B6',
                          textTransform: 'uppercase',
                          letterSpacing: '0.2em',
                          margin: 0,
                        }}>{city.stateName}</p>
                      </div>
                      <div style={{ marginTop: '1.5rem' }}>
                        <div style={{
                          width: '100%',
                          height: '1px',
                          background: 'rgba(255,255,255,0.06)',
                          marginBottom: '0.65rem',
                        }} />
                        <span style={{
                          fontSize: '0.6rem',
                          fontFamily: 'monospace',
                          letterSpacing: '0.15em',
                          color: 'rgba(240, 237, 230, 0.3)',
                        }}>
                          {city.county.toUpperCase()} COUNTY
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
