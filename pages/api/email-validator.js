import axios from 'axios';

export default async (req, res) => {
	if (req.method === 'GET') {
		const options = {
			method: 'GET',
			url: 'https://email-verifier-completely-free.p.rapidapi.com/email-verification/'+ req.query.email,
			params: {email: req.query.email},
			headers: {
				'X-RapidAPI-Host': 'email-verifier-completely-free.p.rapidapi.com',
				'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
			}
		};
		axios
			.request(options)
			.then(function (response) {
				res.status(200).json(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	} else {
		res.status(400);
	}
}
