const corsHeaders = { 'Access-Control-Allow-Origin': '*' };

/**
 * Fetches from the specified URL and returns a forwarded response, with CORS headers
 * @param {string} url
 * @returns
 */
const fetchAndForward = async (url) => {
	const response = await fetch(url);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: { ...Object.fromEntries(response.headers), ...corsHeaders },
	});
};

export default {
	async fetch(request, env, ctx) {
		const url = request.url;
		const params = new URL(url).searchParams;
		const user = params.get('user');
		const skill = params.get('skill');
		if (user) {
			return await fetchAndForward(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${user.trim()}`);
		} else if (skill) {
			return await fetchAndForward(`https://www.runescape.com/img/rsp777/hiscores/skill_icon_${skill.toLocaleLowerCase()}1.gif`);
		} else {
			return new Response("'user' or 'skill' parameter required", {
				status: 400,
				headers: corsHeaders,
			});
		}
	},
};
