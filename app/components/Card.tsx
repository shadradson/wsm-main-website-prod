import { Link } from "react-router";

// ── Card Types ──────────────────────────────────────────────────────

interface ContactCardData {
	type: "contact";
	name: string;
	title?: string;
	photoUrl?: string;
	initials?: string;
	yearsInIndustry?: number;
	linkedinUrl?: string;
	trailblazerUrl?: string;
}

interface ArticleCardData {
	type: "article";
	sfId: string;
	name: string;
	subtitle?: string;
	shortDescription?: string;
	splashImageUrl?: string;
	subcategory?: string;
	verticalProduct?: string;
	authorFirstName?: string;
	authorLastName?: string;
}

interface RelatedArticleCardData {
	type: "relatedArticle";
	sfId: string;
	name: string;
	subtitle?: string;
	shortDescription?: string;
	splashImageUrl?: string;
	subcategory?: string;
	verticalProduct?: string;
	relationshipType?: string;
}

interface CsatCardData {
	type: "csat";
	name: string;
	accountName?: string;
	title?: string;
	starRating?: number;
	testimonial?: string;
}

interface SplashCardData {
	type: "splash";
	title: string;
	subtitle?: string;
	description?: string;
	imageUrl?: string;
	linkUrl?: string;
	linkText?: string;
}

export type CardData =
	| ContactCardData
	| ArticleCardData
	| RelatedArticleCardData
	| CsatCardData
	| SplashCardData;

// ── Main Card Component ─────────────────────────────────────────────

export default function Card({ data }: { data: CardData }) {
	switch (data.type) {
		case "contact":
			return <ContactCard data={data} />;
		case "article":
			return <ArticleCard data={data} />;
		case "relatedArticle":
			return <RelatedArticleCard data={data} />;
		case "csat":
			return <CsatCard data={data} />;
		case "splash":
			return <SplashCard data={data} />;
	}
}

// ── Contact Card ────────────────────────────────────────────────────

function ContactCard({ data }: { data: ContactCardData }) {
	return (
		<div className="w-full sm:w-[calc(50%-1.5rem)] min-w-[400px] grow group p-1 border-4 border-solid border-[#ffffff22] hover:border-[#ffffff77] transition-all cursor-pointer">
			<div className="flex flex-col h-full relative z-10">
				<div className="flex flex-row">
					{data.photoUrl ? (
						<img
							src={data.photoUrl}
							alt={data.name}
							className="w-1/3 aspect-square object-cover flex-shrink-0"
						/>
					) : (
						<div className="w-1/3 aspect-square rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
							{data.initials || data.name.charAt(0)}
						</div>
					)}
					<div className="text-left p-2 w-2/3">
						<p className="text-lg font-bold text-white">{data.name}</p>
						{data.title && (
							<span className="text-xs font-semibold text-wsm-glacier bg-[#ffffff11] border border-[#ffffff22] px-2 py-1 rounded">
								{data.title}
							</span>
						)}
						{data.yearsInIndustry != null && (
							<span className="text-xs font-semibold text-gray-400 bg-[#ffffff08] border border-[#ffffff15] px-2 py-1 rounded">
								{data.yearsInIndustry}+ yrs
							</span>
						)}
					</div>
				</div>
				<div className="flex items-center gap-3 mt-auto border-t border-gray-500 p-2 pattern-bg-dots-sm relative">
					{data.linkedinUrl && (
						<a href={data.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`Visit LinkedIn profile of ${data.name}`} className="text-white hover:text-brand-sky transition-colors">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
						</a>
					)}
					{data.trailblazerUrl && (
						<a href={data.trailblazerUrl} target="_blank" rel="noreferrer" aria-label={`Visit Salesforce Trailhead profile of ${data.name}`} className="text-white hover:text-brand-sky transition-colors">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.856 3.69 2.148a5.173 5.173 0 012.009-.404c2.868 0 5.19 2.337 5.19 5.218 0 2.882-2.322 5.22-5.19 5.22a5.15 5.15 0 01-1.316-.171 4.074 4.074 0 01-3.594 2.147 4.074 4.074 0 01-1.88-.46 4.622 4.622 0 01-3.81 2.022c-2.198 0-4.028-1.542-4.49-3.6a4.166 4.166 0 01-.56.038C1.232 16.267 0 14.71 0 12.818c0-1.263.683-2.467 1.727-3.1a4.498 4.498 0 01-.333-1.691C1.394 5.36 3.763 3 6.71 3c1.37 0 2.63.49 3.296 2.415z" /></svg>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}

// ── Article Card ────────────────────────────────────────────────────

function ArticleCard({ data }: { data: ArticleCardData }) {
	return (
		<Link
			to={`/article/${data.sfId}`}
			aria-label={`Read article: ${data.name}`}
			className="w-full sm:w-[calc(50%-0.5rem)] min-w-[340px] grow group p-1 hover:shadow-xl transition-all"
		>
			<div className="bg-wsm-dark group-hover:bg-[#141b2a] border-2 border-solid border-gray-600 group-hover:border-brand-sky flex h-full relative z-10 transition-colors">
				{data.splashImageUrl ? (
					<img
						src={data.splashImageUrl}
						alt={data.name}
						className="w-1/3 aspect-square object-contain flex-shrink-0 border-r-2 border-gray-600 p-8"
					/>
				) : (
					<div className="w-1/3 aspect-square bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0 border-r-2 border-gray-600" />
				)}
				<div className="text-left p-4 w-2/3 flex flex-col">
					<div className="flex flex-wrap gap-1 mb-2">
						{data.subcategory && (
							<span className="text-xs font-semibold text-wsm-glacier bg-[#ffffff11] border border-[#ffffff22] px-2 py-1 rounded">
								{data.subcategory}
							</span>
						)}
						{data.verticalProduct && (
							<span className="text-xs font-medium text-gray-400 bg-[#ffffff08] border border-[#ffffff15] px-2 py-1 rounded">
								{data.verticalProduct}
							</span>
						)}
					</div>
					<h3 className="text-lg font-bold text-white leading-snug">{data.name}</h3>
					{data.subtitle && (
						<p className="text-wsm-glacier text-sm font-medium mt-1">{data.subtitle}</p>
					)}
					{data.shortDescription && (
						<p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-3">{data.shortDescription}</p>
					)}
					{(data.authorFirstName || data.authorLastName) && (
						<p className="text-xs text-gray-500 mt-auto pt-3 border-t border-gray-800">
							By {data.authorFirstName} {data.authorLastName}
						</p>
					)}
				</div>
			</div>
		</Link>
	);
}

// ── Related Article Card ────────────────────────────────────────────

function RelatedArticleCard({ data }: { data: RelatedArticleCardData }) {
	return (
		<Link
			to={`/article/${data.sfId}`}
			aria-label={`Read related article: ${data.name}`}
			className="w-full sm:w-[calc(50%-0.25rem)] min-w-[300px] grow group p-1 hover:shadow-xl transition-all"
		>
			<div className="bg-wsm-dark group-hover:bg-[#141b2a] border-2 border-solid border-gray-600 group-hover:border-brand-sky flex h-full relative z-10 transition-colors">
				{data.splashImageUrl ? (
					<img
						src={data.splashImageUrl}
						alt={data.name}
						className="w-1/3 aspect-square object-contain flex-shrink-0 border-r-2 border-gray-600 p-8"
					/>
				) : (
					<div className="w-1/3 aspect-square bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0 border-r-2 border-gray-600" />
				)}
				<div className="text-left p-4 w-2/3 flex flex-col">
					<div className="flex flex-wrap gap-1 mb-2">
						{data.subcategory && (
							<span className="text-xs font-semibold text-wsm-glacier bg-[#ffffff11] border border-[#ffffff22] px-2 py-1 rounded">
								{data.subcategory}
							</span>
						)}
						{data.relationshipType && (
							<span className="text-xs font-medium text-gray-500 bg-[#ffffff08] border border-[#ffffff15] px-2 py-1 rounded ml-auto">
								{data.relationshipType}
							</span>
						)}
					</div>
					<h3 className="text-lg font-bold text-white leading-snug">{data.name}</h3>
					{data.subtitle && (
						<p className="text-wsm-glacier text-sm font-medium mt-1">{data.subtitle}</p>
					)}
					{data.shortDescription && (
						<p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-2">{data.shortDescription}</p>
					)}
				</div>
			</div>
		</Link>
	);
}

// ── CSAT Card ───────────────────────────────────────────────────────

function CsatCard({ data }: { data: CsatCardData }) {
	return (
		<div className="w-full sm:w-[calc(50%-0.5rem)] min-w-[340px] grow group p-1">
			<div className="bg-wsm-dark border-2 border-solid border-gray-600 flex flex-col h-full relative z-10 p-6">
				{data.starRating != null && (
					<div className="flex gap-1 mb-3">
						{Array.from({ length: 5 }).map((_, i) => (
							<svg
								key={i}
								className={`w-5 h-5 ${i < data.starRating! ? "text-yellow-400" : "text-gray-600"}`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						))}
					</div>
				)}
				{data.testimonial && (
					<p className="text-gray-300 text-sm leading-relaxed italic mb-4">"{data.testimonial}"</p>
				)}
				<div className="mt-auto pt-3 border-t border-gray-800">
					<p className="text-white font-bold text-sm">{data.name}</p>
					{data.title && <p className="text-gray-500 text-xs">{data.title}</p>}
					{data.accountName && <p className="text-gray-500 text-xs">{data.accountName}</p>}
				</div>
			</div>
		</div>
	);
}

// ── Splash Card ─────────────────────────────────────────────────────

function SplashCard({ data }: { data: SplashCardData }) {
	const content = (
		<div className="bg-wsm-dark group-hover:bg-[#141b2a] border-2 border-solid border-gray-600 group-hover:border-brand-sky flex flex-col h-full relative z-10 transition-colors overflow-hidden">
			{data.imageUrl && (
				<img
					src={data.imageUrl}
					alt={data.title}
					className="w-full h-48 object-cover border-b-2 border-gray-600"
				/>
			)}
			<div className="p-6 flex flex-col flex-1">
				<h3 className="text-lg font-bold text-white leading-snug">{data.title}</h3>
				{data.subtitle && (
					<p className="text-wsm-glacier text-sm font-medium mt-1">{data.subtitle}</p>
				)}
				{data.description && (
					<p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-3">{data.description}</p>
				)}
				{data.linkText && (
					<span className="text-brand-sky text-sm font-semibold mt-auto pt-3 inline-block">
						{data.linkText} &rarr;
					</span>
				)}
			</div>
		</div>
	);

	if (data.linkUrl) {
		return (
			<Link to={data.linkUrl} aria-label={`Learn more about ${data.title}`} className="w-full sm:w-[calc(33%-0.5rem)] min-w-[280px] grow group p-1 hover:shadow-xl transition-all">
				{content}
			</Link>
		);
	}

	return (
		<div className="w-full sm:w-[calc(33%-0.5rem)] min-w-[280px] grow p-1">
			{content}
		</div>
	);
}
