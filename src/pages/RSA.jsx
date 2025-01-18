import { useState } from "react";
import { isPrime, generateKeypair, encrypt, decrypt } from "../rsa";
import { toast, Toaster } from "sonner";

function RSA() {
	const [p, setP] = useState("");
	const [q, setQ] = useState("");
	const [n, setN] = useState("n = p * q");
	const [phi, setPhi] = useState("φ(n) = (p-1)*(q-1)");
	const [e, setE] = useState("e has to be co-prime to φ(n)");
	const [d, setD] = useState("d has to be congruent to e");
	const [toEncrypt, setToEncrypt] = useState("");
	const [toDecrypt, setToDecrypt] = useState("");
	const [encryptedText, setEncryptedText] = useState(
		"Encrypted text will appear here"
	);
	const [decryptedText, setDecryptedText] = useState(
		"Decrypted text will appear here"
	);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-zinc-900">
			<Toaster richColors position="bottom-right" />
			<div className="text-center mt-10 bg-white rounded p-5">
				<h2 className="text-3xl font-semibold text-gray-800 mb-4">
					RSA Algorithm Visualizer
				</h2>

				<div className="flex flex-col gap-6 ">
					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<input
							id="p"
							className="peer w-full h-full bg-purple-200 text-purple-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-purple-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-purple-gray-200 placeholder-shown:border-t-purple-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 focus:border-gray-900"
							placeholder=""
							value={p}
							onChange={(e) => setP(e.target.value)}
							type="text"
						/>
						<label
							className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-purple-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-purple-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-purple-gray-200 peer-focus:before:!border-gray-900 after:border-purple-gray-200 peer-focus:after:!border-gray-900"
							htmlFor="p"
						>
							Enter a prime
						</label>
					</div>

					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<input
							id="q"
							className="peer w-full h-full bg-purple-200 text-purple-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-purple-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-purple-gray-200 placeholder-shown:border-t-purple-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 focus:border-gray-900"
							placeholder=""
							value={q}
							onChange={(e) => setQ(e.target.value)}
							type="text"
						/>
						<label
							className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-purple-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-purple-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-purple-gray-200 peer-focus:before:!border-gray-900 after:border-purple-gray-200 peer-focus:after:!border-gray-900"
							htmlFor="q"
						>
							Enter a prime
						</label>
					</div>

					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<p className="bg-purple-200 font-sans font-normal outline outline-0 text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 w-full">
							{n}
						</p>
						<div>
							<button
								type="submit"
								className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-purple-500 group-hover:from-purple-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
								onClick={(e) => {
									if (!isPrime(p)) {
										toast.error("Both numbers have to be prime.");
										return;
									}
									setN(p * q);
								}}
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Generate
								</span>
							</button>
						</div>
					</div>

					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<p className="bg-purple-200 font-sans font-normal outline outline-0 text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 w-full">
							{phi}
						</p>
						<div>
							<button
								type="submit"
								className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-purple-500 group-hover:from-purple-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
								onClick={(e) => {
									if (!isPrime(p)) {
										toast.error("Both numbers have to be prime.");
										return;
									}

									setPhi((p - 1) * (q - 1));
								}}
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Generate
								</span>
							</button>
						</div>
					</div>

					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<p className="bg-purple-200 font-sans font-normal outline outline-0 text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 w-full">
							{e}
						</p>
						<div>
							<button
								type="submit"
								className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-purple-500 group-hover:from-purple-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
								onClick={(e) => {
									try {
										const { publicKey } = generateKeypair(Number(p), Number(q));

										console.log(publicKey);

										setE(publicKey.e);
									} catch (error) {
										console.log(error);
										setE("e has to be co-prime to φ(n)");
										toast.error("Both the numbers have to be prime.");
									}
								}}
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Generate
								</span>
							</button>
						</div>
					</div>

					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<p className="bg-purple-200 font-sans font-normal outline outline-0 text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 w-full">
							{d}
						</p>
						<div>
							<button
								type="submit"
								className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-purple-500 group-hover:from-purple-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
								onClick={(e) => {
									try {
										const { privateKey } = generateKeypair(
											Number(p),
											Number(q)
										);

										console.log(privateKey);

										setD(privateKey.d);
									} catch (error) {
										console.log(error);
										setD("d has to be congruent to e");

										toast.error("Both the numbers have to be prime.");
									}
								}}
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Generate
								</span>
							</button>
						</div>
					</div>

					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<input
							id="toEncrypt"
							className="peer w-full h-full bg-purple-200 text-purple-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-purple-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-purple-gray-200 placeholder-shown:border-t-purple-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 focus:border-gray-900"
							placeholder=""
							value={toEncrypt}
							onChange={(e) => setToEncrypt(e.target.value)}
							type="text"
						/>
						<label
							className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-purple-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-purple-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-purple-gray-200 peer-focus:before:!border-gray-900 after:border-purple-gray-200 peer-focus:after:!border-gray-900"
							htmlFor="toEncrypt"
						>
							Enter text to encrypt
						</label>

						<div>
							<button
								type="submit"
								className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-purple-500 group-hover:from-purple-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
								onClick={(e) => {
									try {
										const { publicKey } = generateKeypair(Number(p), Number(q));

										console.log(publicKey);

										const encrypted = encrypt(publicKey, toEncrypt);

										setEncryptedText(encrypted);
									} catch (error) {
										console.log(error);
										toast.error(`Error: ${error}`);
									}
								}}
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Generate
								</span>
							</button>
						</div>
					</div>
					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<p className="bg-purple-200 font-sans font-normal outline outline-0 text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 w-full">
							{encryptedText}
						</p>
					</div>

					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<input
							id="q"
							className="peer w-full h-full bg-purple-200 text-purple-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-purple-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-purple-gray-200 placeholder-shown:border-t-purple-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 focus:border-gray-900"
							placeholder=""
							value={toDecrypt}
							onChange={(e) => setToDecrypt(e.target.value)}
							type="text"
						/>
						<label
							className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-purple-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-purple-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-purple-gray-200 peer-focus:before:!border-gray-900 after:border-purple-gray-200 peer-focus:after:!border-gray-900"
							htmlFor="toDecrypt"
						>
							Enter text to decrypt
						</label>

						<div>
							<button
								type="submit"
								className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-purple-500 group-hover:from-purple-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
								onClick={(e) => {
									try {
										const { privateKey } = generateKeypair(
											Number(p),
											Number(q)
										);

										console.log(privateKey);

										console.log(toDecrypt);

										const decrypted = decrypt(privateKey, toDecrypt);

										setDecryptedText(decrypted);
									} catch (error) {
										console.log(error);
										toast.error(`Error: ${error}`);
									}
								}}
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Generate
								</span>
							</button>
						</div>
					</div>
					<div className="flex gap-4 relative w-full min-w-[200px] h-10">
						<p className="bg-purple-200 font-sans font-normal outline outline-0 text-sm px-3 py-2.5 rounded-[7px] border-purple-gray-200 w-full">
							{decryptedText}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RSA;
