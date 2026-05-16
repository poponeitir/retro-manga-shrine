import { createFileRoute } from "@tanstack/react-router";
import mangaCollage from "@/assets/manga-collage.jpg";
import thumb1 from "@/assets/thumb1.jpg";
import thumb2 from "@/assets/thumb2.jpg";
import thumb3 from "@/assets/thumb3.jpg";
import thumb4 from "@/assets/thumb4.jpg";
import thumb5 from "@/assets/thumb5.jpg";
import thumb6 from "@/assets/thumb6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MANGA//SHRINE 芸術 ::: personal archive ::: est. 1998" },
      {
        name: "description",
        content:
          "A personal Neocities/Y2K shrine to manga & anime — archives, scans, webrings, shoutbox and lo-fi terminal vibes.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=VT323&family=Press+Start+2P&display=swap",
      },
    ],
  }),
  component: Index,
});

/* ---------- mini components ---------- */

function Win({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bevel-out p-[2px] mb-2 ${className}`}>
      <div className="titlebar">
        <span className="truncate">▓ {title}</span>
        <span className="flex gap-[2px]">
          <span className="titlebar-btn">_</span>
          <span className="titlebar-btn">□</span>
          <span className="titlebar-btn">×</span>
        </span>
      </div>
      <div className="bg-[#c0c0c0] p-2">{children}</div>
    </div>
  );
}

function Banner88({
  children,
  bg = "#000",
  fg = "#0f0",
  flash = false,
}: {
  children: React.ReactNode;
  bg?: string;
  fg?: string;
  flash?: boolean;
}) {
  return (
    <span
      className={`banner-88 ${flash ? "banner-flash" : ""}`}
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

function AsciiBar({ value, label }: { value: number; label: string }) {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return (
    <div className="retro-mono text-[13px] leading-tight">
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="text-[#006600]">
        [{"█".repeat(filled)}
        <span className="text-[#888]">{"░".repeat(total - filled)}</span>]
      </div>
    </div>
  );
}

/* ---------- page ---------- */

function Index() {
  const navItems = [
    "★ HOME",
    "GALLERY",
    "ARCHIVE",
    "LORE",
    "WEBRING",
    "SHRINE",
    "DOWNLOADS",
    "GUESTBOOK",
    "LINKS.HTM",
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* MASSIVE KANJI WATERMARKS */}
      <div
        aria-hidden
        className="kanji-watermark crt-flicker"
        style={{
          top: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "min(44vw, 680px)",
          lineHeight: 1,
          letterSpacing: "-0.08em",
        }}
      >
        芸術
      </div>
      <div
        aria-hidden
        className="kanji-watermark"
        style={{
          top: "1%",
          left: "1%",
          writingMode: "vertical-rl",
          fontSize: "110px",
          letterSpacing: "0.1em",
        }}
      >
        マンガ・アーカイブ
      </div>
      <div
        aria-hidden
        className="kanji-watermark pixel"
        style={{
          bottom: "8%",
          left: "0",
          right: "0",
          textAlign: "center",
          fontSize: "40px",
          letterSpacing: "0.6em",
          color: "rgba(0,0,0,0.10)",
        }}
      >
        ネット端末遺伝子
      </div>

      {/* MANGA COLLAGE OVERLAY */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${mangaCollage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.20,
          mixBlendMode: "multiply",
        }}
      />

      {/* ============= MAIN CONTAINER ============= */}
      <div className="relative z-10 mx-auto max-w-[1280px] p-2 sm:p-4">
        {/* TOP MARQUEE */}
        <div className="hairline mb-2 bg-black text-[#0f0] overflow-hidden">
          <div className="marquee-track py-[2px] px-2 retro-mono text-[15px]">
            ✦ SYSTEM_UPDATE: scanlation v.3.21 uploaded ✦ NEW: shojo gallery +47 thumbs ✦ WARNING: do not feed the
            mecha after midnight ✦ webring.exe synced @ 03:14 JST ✦ RIP geocities (1994-2009) we remember ✦
            now playing: 月光 — yoko kanno bootleg ✦
          </div>
        </div>

        {/* HEADER */}
        <Win title="C:\\SHRINE\\index.html — Microsoft Internet Explorer 5">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-8">
              <div className="bevel-in p-3 relative scanlines">
                <div className="pixel text-[#444]">// loading payload .... OK</div>
                <h1
                  className="retro-jp font-black tracking-tighter leading-none mt-1"
                  style={{ fontSize: "clamp(34px, 6vw, 72px)" }}
                >
                  <span className="text-black">MANGA</span>
                  <span className="rainbow-text">//</span>
                  <span className="text-black">SHRINE</span>
                </h1>
                <div className="flex flex-wrap items-baseline gap-2 mt-1">
                  <span className="retro-jp text-[20px]">芸術 ・ マンガ ・ 端末</span>
                  <span className="pixel text-[#444]">v3.21 // build 19980422</span>
                </div>
                <p className="mt-2 retro-mono text-[16px] leading-snug">
                  &gt; a personal archive of <span className="bg-[#ffff66] text-black px-[2px]">2D cel-shaded</span>{" "}
                  hand-drawn panels, mecha schematics, shojo sketches &amp; vintage scanlations
                  rescued from dying floppies. handcoded with love &amp; notepad.exe.
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <div className="bevel-in p-2 h-full flex flex-col items-center justify-center gap-2 text-center">
                <div className="pixel text-[#444]">VISITOR COUNT</div>
                <div className="counter-glow text-[26px] font-bold">00133754</div>
                <div className="pixel text-[#444]">UR VISITOR № 00133755</div>
                <div className="pixel text-[10px]">
                  best viewed @ 800×600 ✦ IE5+ ✦ JavaScript ON
                </div>
                <div className="text-4xl select-none" aria-hidden>
                  ✟
                </div>
              </div>
            </div>
          </div>

          {/* NAV BAR */}
          <div className="bevel-out mt-2 flex flex-wrap gap-[2px] p-[2px]">
            {navItems.map((n, i) => (
              <a
                key={i}
                href="#"
                className="bevel-out bg-[#c0c0c0] px-3 py-1 retro-sys text-[12px] font-bold hover:bg-[#c4e800] active:bevel-in"
              >
                {n}
              </a>
            ))}
            <div className="ml-auto pixel self-center pr-2 text-[#444]">
              user@shrine:~$ <span className="blink">_</span>
            </div>
          </div>
        </Win>

        {/* ============= 3-COLUMN BODY ============= */}
        <div className="mt-2 grid grid-cols-12 gap-2">
          {/* LEFT SIDEBAR */}
          <aside className="col-span-12 md:col-span-3 space-y-2">
            <Win title="navigation.dll">
              <ul className="retro-mono text-[15px] space-y-[2px]">
                {[
                  ["» about_me.txt", "★"],
                  ["» manga_archive/", "▶"],
                  ["» mecha_schema/", "▶"],
                  ["» shojo_corner/", "▶"],
                  ["» seinen_pile/", "▶"],
                  ["» scanlations/", "▶"],
                  ["» fanart_pit/", "▶"],
                  ["» webring.exe", "◆"],
                  ["» link2me.html", "✿"],
                  ["» mail.cgi", "✉"],
                ].map(([label, icon]) => (
                  <li key={label} className="flex gap-1 items-center">
                    <span className="text-[#660066]">{icon}</span>
                    <a href="#" className="win-link">{label}</a>
                  </li>
                ))}
              </ul>
            </Win>

            <Win title="webring.swf">
              <div className="text-center retro-sys text-[11px]">
                <div className="pixel text-[#444] mb-1">::: MANGA WEBRING #404 :::</div>
                <div className="flex justify-center gap-1 text-[14px]">
                  <a href="#" className="win-link">« prev</a>
                  <a href="#" className="win-link">rnd</a>
                  <a href="#" className="win-link">list</a>
                  <a href="#" className="win-link">next »</a>
                </div>
              </div>
            </Win>

            <Win title="banners_88x31.gif">
              <div className="flex flex-wrap gap-1 justify-center">
                <Banner88 bg="#000" fg="#0ff">★ NEOCITIES</Banner88>
                <Banner88 bg="#ff00aa" fg="#000" flash>HTML 4.0 ✓</Banner88>
                <Banner88 bg="#003" fg="#fc0">GET NETSCAPE</Banner88>
                <Banner88 bg="#0a0" fg="#000">PNG NOW!</Banner88>
                <Banner88 bg="#222" fg="#0f0" flash>NEW! NEW!</Banner88>
                <Banner88 bg="#fff" fg="#000">800×600 OK</Banner88>
                <Banner88 bg="#660066" fg="#ffea00">MANGA ☓ RING</Banner88>
                <Banner88 bg="#000" fg="#fff" flash>UNDER ⚠ CONSTR</Banner88>
                <Banner88 bg="#0000aa" fg="#0ff">NO FRAMES</Banner88>
                <Banner88 bg="#222" fg="#f80">⚙ MECHA SQD</Banner88>
              </div>
            </Win>

            <Win title="audio_player.exe">
              <div className="bevel-in p-2 bg-[#0a0a18] text-[#0ff] retro-mono text-[13px] relative overflow-hidden">
                <div className="flex justify-between text-[10px] text-[#0f0]">
                  <span>◈ MP3 ◈</span><span>128kbps</span>
                </div>
                <div className="text-[18px] text-[#0ff] leading-tight mt-1">▶ ll ■ ◀◀ ▶▶</div>
                <div className="mt-1 overflow-hidden">
                  <div className="ticker">
                    ♪ yoko kanno — 月光 (bootleg rip) :: 02:14 / 04:38 ♪ susumu hirasawa — siren song ♪ pizzicato five
                    — twiggy twiggy ♪ &nbsp;&nbsp;&nbsp;
                    ♪ yoko kanno — 月光 (bootleg rip) :: 02:14 / 04:38 ♪ susumu hirasawa — siren song ♪ pizzicato five
                    — twiggy twiggy ♪ &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div className="mt-1 text-[#0f0]">[████████░░░░░░░░] 48%</div>
              </div>
            </Win>

            <Win title="system_health.sys">
              <div className="space-y-1">
                <AsciiBar label="DISK_C:" value={82} />
                <AsciiBar label="RAM    " value={47} />
                <AsciiBar label="VIBES  " value={96} />
                <AsciiBar label="LONELY " value={31} />
              </div>
              <pre className="retro-mono text-[11px] text-[#444] mt-2 leading-none">
{`     _
   _| |_
  |     |
  |o   o|  webmaster
  |  >  |  status:
  | \_/ |  ALIVE
   \___/`}
              </pre>
            </Win>
          </aside>

          {/* CENTER CONTENT */}
          <main className="col-span-12 md:col-span-6 space-y-2">
            <Win title="blog.cgi — latest entries">
              <div className="space-y-3 text-[14px] retro-sys">
                {[
                  {
                    date: "1999/04/22 — 03:14 JST",
                    title: "uploaded ch.47 raw scans (cyberpunk arc)",
                    body:
                      "spent the whole nite on the flatbed scanner. dust everywhere. the panel where MEGUMI plugs into the net-terminal hits HARD. mounted as a tiny iframe below — pls do not hotlink.",
                    tag: "NEW",
                  },
                  {
                    date: "1999/04/18 — 22:01 JST",
                    title: "shrine to the swordboy: rewrite",
                    body:
                      "I retyped the lore page in MS Gothic 10pt. added 12 new transparent gifs of him sitting on rooftops. felt cute might delete later.",
                    tag: "EDIT",
                  },
                  {
                    date: "1999/04/11 — 19:47 JST",
                    title: "the mecha schematic .ZIP is BACK",
                    body:
                      "fixed the broken angelfire mirror. all 14 PC-98 dithered blueprints zipped @ 1.4mb. requires WinZip 6.3.",
                    tag: "FIX",
                  },
                ].map((post) => (
                  <article key={post.title} className="bevel-in p-2 bg-[#fbfbf0]">
                    <header className="flex flex-wrap items-baseline gap-2 border-b border-dashed border-[#888] pb-1 mb-1">
                      <span className="pixel text-[#660000]">{post.date}</span>
                      <span
                        className={`pixel px-1 text-white ${
                          post.tag === "NEW" ? "bg-[#cc0000] blink" : post.tag === "FIX" ? "bg-[#006600]" : "bg-[#0033aa]"
                        }`}
                      >
                        {post.tag}
                      </span>
                      <h3 className="font-bold text-[15px]">{post.title}</h3>
                    </header>
                    <p className="leading-snug">{post.body}</p>
                    <div className="mt-1 text-[11px] text-[#444]">
                      &gt; <a href="#" className="win-link">read more...</a> ::
                      <a href="#" className="win-link"> comments (12)</a> :: tagged:
                      <em className="text-[#660066]"> manga, shrine, raw_scans</em>
                    </div>
                  </article>
                ))}
              </div>
            </Win>

            <Win title="manga_gallery_grid.htm">
              <div className="bevel-in bg-white p-1">
                <table className="w-full border-collapse text-[11px]" cellPadding={3}>
                  <thead>
                    <tr className="bg-[#000080] text-white pixel">
                      <th className="text-left border border-black px-1">FILE</th>
                      <th className="text-left border border-black">TITLE</th>
                      <th className="text-left border border-black">GENRE</th>
                      <th className="text-left border border-black">YR</th>
                    </tr>
                  </thead>
                  <tbody className="retro-mono text-[14px]">
                    {[
                      [thumb4, "swrdboy_07.gif", "Lone Blade Vol.7", "shounen / action", "1994"],
                      [thumb2, "mecha_cp38.gif", "Project CP-38", "mecha / cyberpunk", "1987"],
                      [thumb3, "yume_chan.gif", "Yume-chan Diary", "shojo / slice", "1996"],
                      [thumb5, "netgrl_v2.gif", "Net Terminal Girl", "cyberpunk", "1998"],
                      [thumb6, "magik_03.gif", "Magical Stardust 3", "mahou shojo", "1995"],
                      [thumb1, "chibi_h.gif", "Chibi Hours", "comedy / sd", "1999"],
                    ].map(([img, file, title, genre, yr], idx) => (
                      <tr key={file as string} className={`hover:bg-[#c4e800] ${idx % 2 === 0 ? "bg-[#eee]" : "bg-white"}`}>
                        <td className="border border-black align-top">
                          <div className="bevel-in p-[2px] inline-block bg-white">
                            <img
                              src={img as string}
                              alt={title as string}
                              width={64}
                              height={64}
                              loading="lazy"
                              className="block w-16 h-16 object-cover grayscale"
                              style={{ imageRendering: "pixelated" }}
                            />
                          </div>
                          <div className="pixel text-[#444]">{file}</div>
                        </td>
                        <td className="border border-black align-top">
                          <a className="win-link font-bold" href="#">{title}</a>
                          <div className="pixel text-[#666]">★★★★☆</div>
                        </td>
                        <td className="border border-black align-top">{genre}</td>
                        <td className="border border-black align-top">{yr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-1 pixel flex justify-between text-[#444]">
                  <span>showing 6 of 482 entries</span>
                  <span>page 01 / 81 → <a href="#" className="win-link">next»</a></span>
                </div>
              </div>
            </Win>

            <Win title="lore.txt — ネット端末遺伝子">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 bevel-in p-2 bg-[#fbfbf0] retro-mono text-[14px] leading-snug">
                  <p>
                    &gt;&gt; <span className="font-bold">NET TERMINAL GENES</span> — fragments of a
                    transmission decoded from a discarded CRT found in akihabara, 1997. the boy with
                    the sword carries the last functional copy. the mecha-schematic is a map. the
                    shojo-sketch is a key.
                  </p>
                  <p className="mt-2">
                    &gt;&gt; this shrine collects every panel, every cel, every misprinted dōjinshi
                    page. nothing here is for sale. everything here is{" "}
                    <a href="#" className="win-link">free to mirror</a>. webmasters with a soul,
                    please link back.
                  </p>
                </div>
                <div className="bevel-in p-2 text-center bg-[#222] text-[#0f0] retro-mono">
                  <div className="text-[60px] leading-none select-none">✟</div>
                  <div className="pixel mt-1">CRUCIFIX CHARM<br/>v.1.4</div>
                  <div className="text-[10px] mt-1">click to bless</div>
                </div>
              </div>
            </Win>

            <Win title="ascii_art.txt">
              <pre className="retro-mono text-[12px] leading-none text-[#444] bg-[#fbfbf0] bevel-in p-2 overflow-x-auto">
{`    ╔═══════════════════════════════════════╗
    ║  M A N G A   //   S H R I N E   v3    ║
    ╠═══════════════════════════════════════╣
    ║  [█] mecha_schematics...........done  ║
    ║  [█] shojo_sketches...............done  ║
    ║  [░] seinen_translations.........wip   ║
    ║  [█] webring_sync.................ok   ║
    ╚═══════════════════════════════════════╝`}
              </pre>
            </Win>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="col-span-12 md:col-span-3 space-y-2">
            <Win title="shoutbox.cgi">
              <div className="bevel-in p-1 bg-white retro-mono text-[13px] h-56 overflow-hidden">
                {[
                  ["★miku★", "ur shrine made me cry T_T", "#aa0066"],
                  ["sword_brain", "ch.47 is PEAK btw", "#003366"],
                  ["98xX", "where do i dl winamp skin??", "#006600"],
                  ["nina.exe", "the chibi gif is so cute uwu", "#660066"],
                  ["anonymouse", "linked u from my geocities", "#444"],
                  ["mecha_dad", "PC-98 blueprints saved my life", "#0033aa"],
                  ["yumi-chan", "<3 <3 <3 <3 <3", "#cc0000"],
                  ["kenta", "rip swordboy he didnt deserve it", "#660000"],
                  ["ghost", "...is anyone still here....?", "#888"],
                ].map(([u, m, c]) => (
                  <div key={m} className="border-b border-dotted border-[#999] py-[1px]">
                    <span className="font-bold" style={{ color: c }}>{u}:</span>{" "}
                    <span>{m}</span>
                  </div>
                ))}
              </div>
              <div className="mt-1 flex gap-1">
                <input
                  className="bevel-in flex-1 px-1 text-[12px] retro-mono bg-[#f0f0f0]"
                  placeholder="say something..."
                />
                <button className="bevel-out px-2 text-[11px] font-bold active:bevel-in">post!</button>
              </div>
            </Win>

            <Win title="under_construction.gif">
              <div className="bevel-in p-2 bg-[#ffea00] text-center">
                <div className="text-2xl select-none" aria-hidden>⚠ 🚧 ⚙ 🚧 ⚠</div>
                <div className="font-bold blink text-[#cc0000] mt-1">UNDER CONSTRUCTION</div>
                <div className="pixel text-[#444] mt-1">
                  pls excuse the dust<br/>
                  webmaster is rebuilding<br/>
                  the shrine since 1998
                </div>
                <div className="mt-2 inline-block spin text-2xl">⚙</div>
              </div>
            </Win>

            <Win title="affiliates.htm">
              <div className="grid grid-cols-2 gap-1 justify-items-center">
                <Banner88 bg="#660066" fg="#fff">CEL ☓ HEAVEN</Banner88>
                <Banner88 bg="#003366" fg="#0ff" flash>シ TOKYO99</Banner88>
                <Banner88 bg="#000" fg="#ff00aa">★ SHOJO ZONE</Banner88>
                <Banner88 bg="#222" fg="#0f0">MECHANET</Banner88>
                <Banner88 bg="#fff" fg="#000">ANIME.org</Banner88>
                <Banner88 bg="#aa0000" fg="#fc0" flash>BLOOD ❘ INK</Banner88>
              </div>
              <div className="pixel text-center mt-2 text-[#444]">
                want to affiliate? <a href="#" className="win-link">mail me!</a>
              </div>
            </Win>

            <Win title="poll.cgi">
              <div className="text-[13px] retro-sys space-y-1">
                <div className="font-bold">best genre? (vote!)</div>
                {[
                  ["mecha / cyberpunk", 64],
                  ["shojo / slice", 22],
                  ["shounen / action", 11],
                  ["seinen / weird", 3],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="flex justify-between text-[11px]">
                      <span>{l}</span><span>{v}%</span>
                    </div>
                    <div className="bevel-in h-3 bg-white">
                      <div
                        className="h-full"
                        style={{
                          width: `${v}%`,
                          background:
                            "repeating-linear-gradient(45deg,#000080 0 4px,#0000c0 4px 8px)",
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button className="bevel-out mt-1 px-2 py-[1px] text-[11px] active:bevel-in">▶ vote</button>
              </div>
            </Win>

            <Win title="awards.htm">
              <div className="bevel-in p-2 text-center text-[11px] retro-sys">
                <div className="pixel text-[#660000]">⛧ HALL OF SHRINES ⛧</div>
                <div className="text-3xl mt-1">🏆</div>
                <div className="mt-1">"best 1998 fansite"<br/>— webcrawler weekly</div>
                <div className="rainbow-text mt-1 font-bold">★ TOP 100 ★</div>
              </div>
            </Win>
          </aside>
        </div>

        {/* FOOTER */}
        <div className="mt-2 bevel-out p-2 text-center retro-mono text-[13px] relative">
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <Banner88 bg="#000" fg="#0f0">★ NEOCITIES</Banner88>
            <Banner88 bg="#fff" fg="#000">HTML 4.0 ✓</Banner88>
            <Banner88 bg="#003" fg="#fc0" flash>CSS LV.1</Banner88>
            <Banner88 bg="#660066" fg="#ffea00">NETSCAPE 4</Banner88>
            <Banner88 bg="#222" fg="#0ff">⚙ MADE WITH NOTEPAD</Banner88>
          </div>
          <div className="mt-2">
            © 1998–1999 MANGA//SHRINE — handcoded with ♡ on a thinkpad 600 — best in 800×600 —{" "}
            <a className="win-link" href="#">view source ⌥U</a> :: <a className="win-link" href="#">mail webmaster</a>
          </div>
          <div className="pixel text-[#444] mt-1">
            this page is part of the ネット端末遺伝子 archive. all art © respective mangaka, mirrored for preservation only.
          </div>
        </div>
      </div>
    </div>
  );
}
