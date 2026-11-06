type FlagCode = 'ua' | 'pl' | 'de' | 'ee' | 'lt' | 'lv' | 'fr' | 'it';

const names: Record<FlagCode, string> = {
  ua: 'Україна',
  pl: 'Польща',
  de: 'Німеччина',
  ee: 'Естонія',
  lt: 'Литва',
  lv: 'Латвія',
  fr: 'Франція',
  it: 'Італія',
};

export type { FlagCode };

export function CountryFlag({ code }: { code: FlagCode }) {
  return (
    <svg className="country-flag" viewBox="0 0 30 20" role="img" aria-label={names[code]}>
      <rect width="30" height="20" fill="#fff" />
      {code === 'ua' && (
        <>
          <rect width="30" height="10" fill="#0057b7" />
          <rect y="10" width="30" height="10" fill="#ffd700" />
        </>
      )}
      {code === 'pl' && <rect y="10" width="30" height="10" fill="#dc143c" />}
      {code === 'de' && (
        <>
          <rect width="30" height="6.667" fill="#111" />
          <rect y="6.667" width="30" height="6.667" fill="#dd0000" />
          <rect y="13.334" width="30" height="6.666" fill="#ffce00" />
        </>
      )}
      {code === 'ee' && (
        <>
          <rect width="30" height="6.667" fill="#4891d9" />
          <rect y="6.667" width="30" height="6.667" fill="#111" />
          <rect y="13.334" width="30" height="6.666" fill="#fff" />
        </>
      )}
      {code === 'lt' && (
        <>
          <rect width="30" height="6.667" fill="#fdb913" />
          <rect y="6.667" width="30" height="6.667" fill="#006a44" />
          <rect y="13.334" width="30" height="6.666" fill="#c1272d" />
        </>
      )}
      {code === 'lv' && (
        <>
          <rect width="30" height="8" fill="#9e1b34" />
          <rect y="12" width="30" height="8" fill="#9e1b34" />
        </>
      )}
      {code === 'fr' && (
        <>
          <rect width="10" height="20" fill="#002395" />
          <rect x="20" width="10" height="20" fill="#ed2939" />
        </>
      )}
      {code === 'it' && (
        <>
          <rect width="10" height="20" fill="#009246" />
          <rect x="20" width="10" height="20" fill="#ce2b37" />
        </>
      )}
    </svg>
  );
}
