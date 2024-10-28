export default {
  async fetch(request, env, ctx) {
    const url = request.url;
    const params = new URL(url).searchParams;
    const user = params.get("user");
    if (user) {
      const osrsResponse = await fetch(
        `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${user.trim()}`
      );
      return new Response(osrsResponse.body, {
        status: osrsResponse.status,
        statusText: osrsResponse.statusText,
        headers: {...osrsResponse.headers, "Access-Control-Allow-Origin": "*"},
      });
    } else {
      return new Response("'user' parameter required", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
  },
};
