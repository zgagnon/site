export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon/android-icon-192x192.png","favicon/apple-icon-114x114.png","favicon/apple-icon-120x120.png","favicon/apple-icon-144x144.png","favicon/apple-icon-152x152.png","favicon/apple-icon-180x180.png","favicon/apple-icon-57x57.png","favicon/apple-icon-60x60.png","favicon/apple-icon-72x72.png","favicon/apple-icon-76x76.png","favicon/browserconfig.xml","favicon/favicon-16x16.png","favicon/favicon-256x256.png","favicon/favicon-32x32.png","favicon/favicon-96x96.png","favicon/favicon.ico","favicon/instructions.txt","favicon/manifest.json","favicon/ms-icon-144x144.png","favicon/ms-icon-150x150.png","favicon/ms-icon-310x310.png","favicon/ms-icon-70x70.png","files/resume.pdf","fonts/Quattrocento/OFL.txt","fonts/Quattrocento/Quattrocento-Bold.ttf","fonts/Quattrocento/Quattrocento-Regular.ttf","fonts/Sacramento/OFL.txt","fonts/Sacramento/Sacramento-Regular.ttf","fonts/Urbanist/OFL.txt","fonts/Urbanist/README.txt","fonts/Urbanist/Urbanist-Italic-VariableFont_wght.ttf","fonts/Urbanist/Urbanist-VariableFont_wght.ttf","fonts/Urbanist/static/Urbanist-Black.ttf","fonts/Urbanist/static/Urbanist-BlackItalic.ttf","fonts/Urbanist/static/Urbanist-Bold.ttf","fonts/Urbanist/static/Urbanist-BoldItalic.ttf","fonts/Urbanist/static/Urbanist-ExtraBold.ttf","fonts/Urbanist/static/Urbanist-ExtraBoldItalic.ttf","fonts/Urbanist/static/Urbanist-ExtraLight.ttf","fonts/Urbanist/static/Urbanist-ExtraLightItalic.ttf","fonts/Urbanist/static/Urbanist-Italic.ttf","fonts/Urbanist/static/Urbanist-Light.ttf","fonts/Urbanist/static/Urbanist-LightItalic.ttf","fonts/Urbanist/static/Urbanist-Medium.ttf","fonts/Urbanist/static/Urbanist-MediumItalic.ttf","fonts/Urbanist/static/Urbanist-Regular.ttf","fonts/Urbanist/static/Urbanist-SemiBold.ttf","fonts/Urbanist/static/Urbanist-SemiBoldItalic.ttf","fonts/Urbanist/static/Urbanist-Thin.ttf","fonts/Urbanist/static/Urbanist-ThinItalic.ttf"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".txt":"text/plain",".json":"application/json",".pdf":"application/pdf",".ttf":"font/ttf"},
	_: {
		client: {"start":"_app/immutable/entry/start.c28f9515.js","app":"_app/immutable/entry/app.09a1f259.js","imports":["_app/immutable/entry/start.c28f9515.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.c29f7019.js","_app/immutable/entry/app.09a1f259.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.54870669.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/resume",
				pattern: /^\/resume\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/run",
				pattern: /^\/run\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
