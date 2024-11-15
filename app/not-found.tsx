import Link from 'next/link';

export default function NotFound(){
	return(
		<div className="p-10 border rounded-md relative">
			<h1 className="font-black text-3xl mb-3">Route segment not found.</h1>
			<p className="font-semibold">
				Return to{' '} 
				<Link href="/">
					<span className="text-cyan-500 cursor-pointer transition-colors
					hover:text-cyan-600 hover:underline underline-offset-1">
						home page
					</span>
				</Link>
			</p>

			<div className="absolute fixed bottom-5 right-5">
				<h2 className="font-black">404</h2>
			</div>
		</div>
	)
}