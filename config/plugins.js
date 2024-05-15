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
      provider: "sendgrid",
      providerOptions: {
        apiKey:
          "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",
      },
      settings: {
        defaultFrom: "dthemesdevelopment@gmail.com",
        defaultReplyTo: "dthemesdevelopment@gmail.com",
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
