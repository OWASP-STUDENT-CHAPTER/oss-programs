import { ImageResponse } from 'next/og'
import { getProgramBySlug } from '@/lib/programs'

export const runtime = 'nodejs' // needs fs via lib/programs

export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

const baseURL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://oss.owasptiet.com')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')

function statusBg(status: string): string {
    if (status === 'open') return '#166534'
    if (status === 'opening_soon' || status === 'upcoming') return '#854d0e'
    return '#18181b'
}

function statusLabel(status: string): string {
    if (status === 'open') return 'OPEN'
    if (status === 'opening_soon') return 'OPENING SOON'
    if (status === 'upcoming') return 'UPCOMING'
    return 'CLOSED'
}

function capitalise(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const program = getProgramBySlug(slug)

    if (!program) {
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        background: '#f0faf8',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 48,
                        fontFamily: 'Arial',
                        color: '#09090b',
                    }}
                >
                    Program Not Found
                </div>
            ),
            size
        )
    }

    const stipendText = program.stipend.available
        ? program.stipend.amount_text ?? `Up to $${(program.stipend.max_usd ?? 0).toLocaleString()}`
        : 'No Stipend'

    // Truncate long stipend text so it doesn't overflow the stats row
    const stipendDisplay = stipendText.length > 28
        ? stipendText.slice(0, 28) + '…'
        : stipendText

    const category = capitalise(program.category)
    const status = program.status
    const nameFontSize = program.name.length > 30 ? 60 : program.name.length > 20 ? 70 : 78

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    background: '#f0faf8',
                    fontFamily: 'Arial',
                }}
            >
                {/* Grid */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        backgroundSize: '32px 32px',
                        backgroundImage:
                            'linear-gradient(to right, rgba(113,113,122,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.1) 1px, transparent 1px)',
                    }}
                />

                {/* OSS watermark */}
                <div
                    style={{
                        position: 'absolute',
                        left: -20,
                        bottom: -40,
                        display: 'flex',
                        fontSize: 340,
                        fontWeight: 900,
                        color: 'rgba(9,9,11,0.045)',
                        lineHeight: 1,
                        letterSpacing: -10,
                    }}
                >
                    OSS
                </div>

                {/* Right panel */}
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 380,
                        height: 630,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        background: '#e2eeeb',
                        borderLeft: '1.5px solid #c4d8d3',
                        paddingBottom: 28,
                    }}
                >
                    <div style={{ display: 'flex', fontSize: 12, color: '#52525b' }}>
                        {baseURL}
                    </div>
                </div>

                {/* Logo — exact from Header.tsx */}
                <div style={{ position: 'absolute', left: 57, top: 33, display: 'flex' }}>
                    <div style={{ display: 'flex', background: '#1e2535', borderRadius: 8, padding: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20" />
                            <path d="m4.93 4.93 14.14 14.14" />
                            <path d="M2 12h20" />
                            <path d="m19.07 4.93-14.14 14.14" />
                        </svg>
                    </div>
                </div>

                {/* Brand */}
                <div
                    style={{
                        position: 'absolute',
                        left: 113,
                        top: 42,
                        display: 'flex',
                        fontSize: 19,
                        fontWeight: 900,
                        color: '#09090b',
                    }}
                >
                    OSS Opps
                </div>

                {/* Top divider */}
                <div
                    style={{
                        position: 'absolute',
                        left: 58,
                        top: 92,
                        width: 722,
                        height: 1.5,
                        display: 'flex',
                        background: '#c4d8d3',
                    }}
                />

                {/* Status badge */}
                <div
                    style={{
                        position: 'absolute',
                        left: 58,
                        top: 116,
                        height: 30,
                        paddingLeft: 14,
                        paddingRight: 14,
                        borderRadius: 6,
                        background: statusBg(status),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ display: 'flex', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                        {statusLabel(status)}
                    </div>
                </div>

                {/* Category badge */}
                <div
                    style={{
                        position: 'absolute',
                        left: 175,
                        top: 116,
                        height: 30,
                        paddingLeft: 14,
                        paddingRight: 14,
                        borderRadius: 6,
                        border: '1.5px solid #c4d8d3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ display: 'flex', fontSize: 12, color: '#52525b' }}>{category}</div>
                </div>

                {/* Program name */}
                <div
                    style={{
                        position: 'absolute',
                        left: 58,
                        top: 175,
                        display: 'flex',
                        fontSize: nameFontSize,
                        fontWeight: 900,
                        color: '#09090b',
                        maxWidth: 720,
                        lineHeight: 1.1,
                        letterSpacing: -2,
                    }}
                >
                    {program.name}
                </div>

                {/* Underline accent */}
                <div
                    style={{
                        position: 'absolute',
                        left: 58,
                        top: 370,
                        width: 88,
                        height: 4,
                        display: 'flex',
                        borderRadius: 2,
                        background: '#09090b',
                    }}
                />

                {/* Stats rule */}
                <div
                    style={{
                        position: 'absolute',
                        left: 58,
                        top: 414,
                        width: 722,
                        height: 1.5,
                        display: 'flex',
                        background: '#c4d8d3',
                    }}
                />

                {/* Stipend */}
                <div
                    style={{
                        position: 'absolute',
                        left: 58,
                        top: 434,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        maxWidth: 290,
                    }}
                >
                    <div style={{ display: 'flex', fontSize: 10, fontWeight: 700, color: '#a1a1aa', letterSpacing: 2 }}>STIPEND</div>
                    <div style={{ display: 'flex', fontSize: 21, fontWeight: 900, color: '#09090b', maxWidth: 290 }}>{stipendDisplay}</div>
                </div>

                {/* Divider 1 */}
                <div style={{ position: 'absolute', left: 370, top: 424, width: 1.5, height: 66, display: 'flex', background: '#c4d8d3' }} />

                {/* Category stat */}
                <div
                    style={{
                        position: 'absolute',
                        left: 388,
                        top: 434,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                    }}
                >
                    <div style={{ display: 'flex', fontSize: 10, fontWeight: 700, color: '#a1a1aa', letterSpacing: 2 }}>CATEGORY</div>
                    <div style={{ display: 'flex', fontSize: 21, fontWeight: 900, color: '#09090b' }}>{category}</div>
                </div>

                {/* Divider 2 */}
                <div style={{ position: 'absolute', left: 600, top: 424, width: 1.5, height: 66, display: 'flex', background: '#c4d8d3' }} />

                {/* Remote/Eligibility */}
                <div
                    style={{
                        position: 'absolute',
                        left: 618,
                        top: 434,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                    }}
                >
                    <div style={{ display: 'flex', fontSize: 10, fontWeight: 700, color: '#a1a1aa', letterSpacing: 2 }}>FORMAT</div>
                    <div style={{ display: 'flex', fontSize: 21, fontWeight: 900, color: '#09090b' }}>
                        {program.remote ? 'Remote' : 'On-site'}
                    </div>
                </div>

                {/* URL */}
                <div
                    style={{
                        position: 'absolute',
                        left: 58,
                        top: 560,
                        display: 'flex',
                        fontSize: 12,
                        color: '#a1a1aa',
                    }}
                >
                    {baseURL}/programs/{slug}
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 1200,
                        height: 8,
                        display: 'flex',
                        background: '#09090b',
                    }}
                />
            </div>
        ),
        size
    )
}