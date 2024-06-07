module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          folder: "Reef_Media",
          use_filename: true,
          unique_filename: false,
        },
        delete: {},
      },
    },
  },
  'website-builder': {
		enabled: true,
		config: {
			builds: [
				{
					name: 'production',
          url: env("VERCEL_HOOK_URL"),
					trigger: {
						type: 'manual',
					},
				},
			],
		},
	},
  email: {
    config: {
      provider: 'mailgun',
      providerOptions: {
        key: "c9ce7757b44691e38e93747d117ccc3c-a4da91cf-b2256137", // Required
        domain: "sandbox217af371055141ba95712b7c5e1ada68.mailgun.org", // Required
        host: 'api.mailgun.net',
      },
      settings: {
        defaultFrom: 'dthemesdevelopment@gmail.com',
        defaultReplyTo: 'lovelybear0904@gmail.com',
      },
    },
  },
  // "website-builder": {
  //   enabled: true,
  //   config: {
  //     url: env("VERCEL_HOOK_URL"),
  //     trigger: {
  //       type: "manual",
  //     },
  //     body: {
  //       target: {
  //         ref_type: "branch",
  //         type: "pipeline_ref_target",
  //         ref_name: "master",
  //       },
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  // },
});
