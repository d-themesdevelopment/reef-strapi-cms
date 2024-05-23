import type { Schema, Attribute } from '@strapi/strapi';

export interface BaseContentTwo extends Schema.Component {
  collectionName: 'components_base_content_twos';
  info: {
    displayName: 'ContentTwo';
    icon: 'attachment';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    value: Attribute.Enumeration<
      [
        'Full-Time',
        'Part-Time',
        '\u0648\u0642\u062A \u0643\u0627\u0645\u0644',
        '\u062F\u0648\u0627\u0645 \u062C\u0632\u0626\u0649'
      ]
    >;
  };
}

export interface BaseContent extends Schema.Component {
  collectionName: 'components_base_contents';
  info: {
    displayName: 'content';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    value: Attribute.Text;
  };
}

export interface BaseHeading extends Schema.Component {
  collectionName: 'components_base_headings';
  info: {
    displayName: 'heading';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    subtitle: Attribute.String;
  };
}

export interface BaseMedia extends Schema.Component {
  collectionName: 'components_base_media';
  info: {
    displayName: 'media';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    alt: Attribute.String & Attribute.Required;
  };
}

export interface BaseMenu extends Schema.Component {
  collectionName: 'components_base_menus';
  info: {
    displayName: 'menu';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    value: Attribute.Text;
    subMenu: Attribute.Component<'base.content', true>;
  };
}

export interface BaseVideo extends Schema.Component {
  collectionName: 'components_base_videos';
  info: {
    displayName: 'video';
    description: '';
  };
  attributes: {
    videoUrl: Attribute.Text;
    image: Attribute.Media;
    alt: Attribute.String;
  };
}

export interface FeaturesAccordion extends Schema.Component {
  collectionName: 'components_features_accordions';
  info: {
    displayName: 'accordion';
  };
  attributes: {
    accordion: Attribute.Component<'base.content', true>;
  };
}

export interface FeaturesAddress extends Schema.Component {
  collectionName: 'components_features_addresses';
  info: {
    displayName: 'contactAddress';
    description: '';
  };
  attributes: {
    capital: Attribute.String;
    address: Attribute.Text;
    email: Attribute.Component<'base.content'>;
    phone: Attribute.Component<'base.content'>;
    nationalAddress: Attribute.Component<'base.content'>;
    media: Attribute.Component<'base.media'>;
  };
}

export interface FeaturesAgreement extends Schema.Component {
  collectionName: 'components_features_agreements';
  info: {
    displayName: 'agreement';
    description: '';
  };
  attributes: {
    complete: Attribute.Boolean & Attribute.DefaultTo<false>;
    cancel: Attribute.Boolean & Attribute.DefaultTo<false>;
    pdfUrl: Attribute.Text;
    message: Attribute.RichText;
  };
}

export interface FeaturesCategoryBox extends Schema.Component {
  collectionName: 'components_features_category_boxes';
  info: {
    displayName: 'categoryBox';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    logo: Attribute.Component<'base.media'>;
    background: Attribute.Component<'base.media'>;
  };
}

export interface FeaturesInfoBox extends Schema.Component {
  collectionName: 'components_features_info_boxes';
  info: {
    displayName: 'infoBox';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    media: Attribute.Component<'base.media'>;
  };
}

export interface FeaturesPersonalInformation extends Schema.Component {
  collectionName: 'components_features_personal_informations';
  info: {
    displayName: 'personalInformation';
    description: '';
  };
  attributes: {
    firstName: Attribute.String;
    lastName: Attribute.String;
    fatherName: Attribute.String;
    grandFatherName: Attribute.String;
    email: Attribute.String;
    address: Attribute.Text;
    idNumber: Attribute.Integer;
    mobileNumber: Attribute.String;
  };
}

export interface FeaturesRequestInformation extends Schema.Component {
  collectionName: 'components_features_request_informations';
  info: {
    displayName: 'requestInformation';
  };
  attributes: {
    serviceName: Attribute.String;
    applicantCategory: Attribute.String;
    specialty: Attribute.String;
    qualificationType: Attribute.String;
    qualificationDesc: Attribute.Text;
    professionalStatus: Attribute.String;
  };
}

export interface FeaturesServiceBox extends Schema.Component {
  collectionName: 'components_features_service_boxes';
  info: {
    displayName: 'serviceBox';
    description: '';
  };
  attributes: {
    serviceRequestID: Attribute.String & Attribute.Required;
    service: Attribute.Relation<
      'features.service-box',
      'oneToOne',
      'api::service.service'
    >;
  };
}

export interface FeaturesServiceForm extends Schema.Component {
  collectionName: 'components_features_service_forms';
  info: {
    displayName: 'serviceForm';
  };
  attributes: {
    serviceName: Attribute.String;
  };
}

export interface PartialsArticle extends Schema.Component {
  collectionName: 'components_partials_articles';
  info: {
    displayName: 'article';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    button: Attribute.Component<'base.content'>;
  };
}

export interface PartialsCareerPageHeader extends Schema.Component {
  collectionName: 'components_partials_career_page_headers';
  info: {
    displayName: 'careerPageHeader';
    icon: 'bold';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    buttons: Attribute.Component<'base.content', true>;
    media: Attribute.Media;
  };
}

export interface PartialsCategoriesTwo extends Schema.Component {
  collectionName: 'components_partials_categories_twos';
  info: {
    displayName: 'categoriesTwo';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    buttons: Attribute.Component<'base.content', true>;
  };
}

export interface PartialsCategories extends Schema.Component {
  collectionName: 'components_partials_categories';
  info: {
    displayName: 'categories';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
  };
}

export interface PartialsContactForm extends Schema.Component {
  collectionName: 'components_partials_contact_forms';
  info: {
    displayName: 'contactForm';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    email: Attribute.Component<'base.content'>;
    phone: Attribute.Component<'base.content'>;
    nationalAddress: Attribute.Component<'base.content'>;
    emailForm: Attribute.Component<'base.content'>;
    usernameForm: Attribute.Component<'base.content'>;
    subjectForm: Attribute.Component<'base.content'>;
    phoneForm: Attribute.Component<'base.content'>;
    messageForm: Attribute.Component<'base.content'>;
    submitBtnTitle: Attribute.String;
  };
}

export interface PartialsContactUsForm extends Schema.Component {
  collectionName: 'components_partials_contact_us_forms';
  info: {
    displayName: 'contactUsForm';
    icon: 'book';
  };
  attributes: {
    icon: Attribute.Component<'base.media'>;
    title: Attribute.String;
    contactButton: Attribute.Component<'base.content'>;
    addressButton: Attribute.Component<'base.content'>;
  };
}

export interface PartialsFaq extends Schema.Component {
  collectionName: 'components_partials_faqs';
  info: {
    displayName: 'faq';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    accordion: Attribute.Component<'base.content', true>;
    type: Attribute.Enumeration<['type1', 'type2']>;
  };
}

export interface PartialsIntroArticles extends Schema.Component {
  collectionName: 'components_partials_intro_articles';
  info: {
    displayName: 'introArticles';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
  };
}

export interface PartialsIntroVideoBanner extends Schema.Component {
  collectionName: 'components_partials_intro_video_banners';
  info: {
    displayName: 'introVideoBanner';
    description: '';
  };
  attributes: {
    subtitle: Attribute.String;
    title: Attribute.String;
    desc: Attribute.Text;
    button: Attribute.Component<'base.content'>;
    video: Attribute.Component<'base.video'>;
  };
}

export interface PartialsIntro extends Schema.Component {
  collectionName: 'components_partials_intros';
  info: {
    displayName: 'intro';
    description: '';
  };
  attributes: {
    media: Attribute.Component<'base.media'>;
    heading: Attribute.Component<'base.heading'>;
  };
}

export interface PartialsJobs extends Schema.Component {
  collectionName: 'components_partials_jobs';
  info: {
    displayName: 'Jobs';
    icon: 'briefcase';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    categoryText: Attribute.String;
    positionText: Attribute.String;
    applyText: Attribute.String;
    emptyItemText: Attribute.String;
  };
}

export interface PartialsLatestArticles extends Schema.Component {
  collectionName: 'components_partials_latest_articles';
  info: {
    displayName: 'latestArticles';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface PartialsMembers extends Schema.Component {
  collectionName: 'components_partials_members';
  info: {
    displayName: 'members';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface PartialsNewsletter extends Schema.Component {
  collectionName: 'components_partials_newsletters';
  info: {
    displayName: 'newsletter';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface PartialsOurLocationInfo extends Schema.Component {
  collectionName: 'components_partials_our_location_infos';
  info: {
    displayName: 'OurLocationInfo';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    button: Attribute.Component<'base.content'>;
    contactAddress: Attribute.Component<'features.address'>;
  };
}

export interface PartialsPageHeader extends Schema.Component {
  collectionName: 'components_partials_page_headers';
  info: {
    displayName: 'pageHeader';
    description: '';
  };
  attributes: {
    subtitle: Attribute.String;
    title: Attribute.String;
    desc: Attribute.Text;
    menu: Attribute.Component<'base.content', true>;
  };
}

export interface PartialsRegulationsAndPolicies extends Schema.Component {
  collectionName: 'components_partials_regulations_and_policies';
  info: {
    displayName: 'regulationsAndPolicies';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface PartialsReports extends Schema.Component {
  collectionName: 'components_partials_reports';
  info: {
    displayName: 'reports';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
  };
}

export interface PartialsServicesTwo extends Schema.Component {
  collectionName: 'components_partials_services_twos';
  info: {
    displayName: 'servicesTwo';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    button: Attribute.Component<'base.content'>;
  };
}

export interface PartialsServices extends Schema.Component {
  collectionName: 'components_partials_services';
  info: {
    displayName: 'services';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    button: Attribute.Component<'base.content'>;
  };
}

export interface PartialsStakeholders extends Schema.Component {
  collectionName: 'components_partials_stakeholders';
  info: {
    displayName: 'stakeholders';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'base.heading'>;
    infoBoxes: Attribute.Component<'features.info-box', true>;
    buttons: Attribute.Component<'base.content', true>;
  };
}

export interface SharedCookieButton extends Schema.Component {
  collectionName: 'components_shared_cookie_buttons';
  info: {
    displayName: 'Cookie Button';
    icon: 'mouse-pointer';
  };
  attributes: {
    buttonType: Attribute.Enumeration<['Primary', 'Secondary', 'Text']>;
    label: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'base.content-two': BaseContentTwo;
      'base.content': BaseContent;
      'base.heading': BaseHeading;
      'base.media': BaseMedia;
      'base.menu': BaseMenu;
      'base.video': BaseVideo;
      'features.accordion': FeaturesAccordion;
      'features.address': FeaturesAddress;
      'features.agreement': FeaturesAgreement;
      'features.category-box': FeaturesCategoryBox;
      'features.info-box': FeaturesInfoBox;
      'features.personal-information': FeaturesPersonalInformation;
      'features.request-information': FeaturesRequestInformation;
      'features.service-box': FeaturesServiceBox;
      'features.service-form': FeaturesServiceForm;
      'partials.article': PartialsArticle;
      'partials.career-page-header': PartialsCareerPageHeader;
      'partials.categories-two': PartialsCategoriesTwo;
      'partials.categories': PartialsCategories;
      'partials.contact-form': PartialsContactForm;
      'partials.contact-us-form': PartialsContactUsForm;
      'partials.faq': PartialsFaq;
      'partials.intro-articles': PartialsIntroArticles;
      'partials.intro-video-banner': PartialsIntroVideoBanner;
      'partials.intro': PartialsIntro;
      'partials.jobs': PartialsJobs;
      'partials.latest-articles': PartialsLatestArticles;
      'partials.members': PartialsMembers;
      'partials.newsletter': PartialsNewsletter;
      'partials.our-location-info': PartialsOurLocationInfo;
      'partials.page-header': PartialsPageHeader;
      'partials.regulations-and-policies': PartialsRegulationsAndPolicies;
      'partials.reports': PartialsReports;
      'partials.services-two': PartialsServicesTwo;
      'partials.services': PartialsServices;
      'partials.stakeholders': PartialsStakeholders;
      'shared.cookie-button': SharedCookieButton;
    }
  }
}
