export type ScholarshipArtKind = 'defense' | 'education' | 'rescue' | 'energy' | 'family' | 'mitten';

export function ScholarshipArt({ kind }: { kind: ScholarshipArtKind }) {
  const symbol = {
    defense: (
      <>
        <path d="M240 56 308 83v52c0 47-25 81-68 104-43-23-68-57-68-104V83z" />
        <path d="m240 98 9 23 25 2-19 16 6 25-21-13-21 13 6-25-19-16 25-2z" />
      </>
    ),
    education: (
      <>
        <path d="M149 83c33-16 65-15 91 2 26-17 58-18 91-2v113c-33-16-65-15-91 2-26-17-58-18-91-2z" />
        <path d="M240 85v113M171 116c17-5 31-4 45 1M264 117c14-5 28-6 45-1" />
      </>
    ),
    rescue: (
      <>
        <path d="M240 218s-83-51-83-105a45 45 0 0 1 83-23 45 45 0 0 1 83 23c0 54-83 105-83 105z" />
        <path d="M240 111v69M206 145h68" />
      </>
    ),
    energy: (
      <>
        <path d="m265 62-88 104h55l-17 66 88-105h-55z" />
        <path d="M147 84 130 69M332 204l18 16M128 181l-24 7" />
      </>
    ),
    family: (
      <>
        <circle cx="205" cy="111" r="27" />
        <circle cx="275" cy="111" r="27" />
        <path d="M161 204c0-33 15-52 44-52 16 0 28 8 35 21 7-13 19-21 35-21 29 0 44 19 44 52z" />
        <path d="m240 79 9-10 9 10-18 19-18-19 9-10z" />
      </>
    ),
    mitten: (
      <>
        <path d="M202 216V121a33 33 0 0 1 66 0v23c0-26 39-25 39 4 0 36-16 66-39 83h-66a35 35 0 0 1-35-35v-24a18 18 0 0 1 35 0z" />
        <path d="M202 200h90M236 99v18" />
      </>
    ),
  }[kind];
  return (
    <svg className="scholarship-art" viewBox="0 0 480 280" aria-hidden="true" focusable="false">
      <circle cx="240" cy="140" r="122" fill="rgba(255,255,255,.13)" />
      <circle cx="240" cy="140" r="93" fill="rgba(255,255,255,.16)" />
      <circle cx="78" cy="69" r="13" fill="rgba(255,255,255,.38)" />
      <circle cx="401" cy="207" r="21" fill="rgba(255,255,255,.24)" />
      <path
        d="m366 54 7 18 19 7-19 7-7 18-7-18-19-7 19-7zM111 209l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"
        fill="rgba(255,255,255,.8)"
      />
      <g fill="none" stroke="white" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round">
        {symbol}
      </g>
    </svg>
  );
}
