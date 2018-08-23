var domain = process.env.BACKSTOP_DOMAIN

var scenarios = [
  {
    "label": "/workforce-and-business",
    "url": domain + "/workforce-and-business"
  },
  {
    "label": "/workforce-and-business/workforce-diversity/civil-service-workforce/latest",
    "url": domain + "/workforce-and-business/workforce-diversity/civil-service-workforce/latest"
  },
  {
    "label": "/workforce-and-business/nhs-staff-experience/nhs-staff-experiencing-discrimination-at-work/latest",
    "url": domain + "/workforce-and-business/nhs-staff-experience/nhs-staff-experiencing-discrimination-at-work/latest"
  },
  {
    "label": "/workforce-and-business/business-and-self-employment/self-employment/latest",
    "url": domain + "/workforce-and-business/business-and-self-employment/self-employment/latest"
  },
  {
    "label": "/british-population",
    "url": domain + "/british-population"
  },
  {
    "label": "/british-population/national-and-regional-populations/population-of-england-and-wales/latest",
    "url": domain + "/british-population/national-and-regional-populations/population-of-england-and-wales/latest"
  },
  {
    "label": "/british-population/demographics/male-and-female-populations/latest",
    "url": domain + "/british-population/demographics/male-and-female-populations/latest"
  },
  {
    "label": "/health",
    "url": domain + "/health"
  },
  {
    "label": "/health/access-to-treatment/satisfaction-with-access-to-gp-services/latest",
    "url": domain + "/health/access-to-treatment/satisfaction-with-access-to-gp-services/latest"
  },
  {
    "label": "/health/exercise-and-activity/physical-activity/latest",
    "url": domain + "/health/exercise-and-activity/physical-activity/latest"
  },
  {
    "label": "/health/patient-experiences/patient-experience-of-primary-care-gp-services/latest",
    "url": domain + "/health/patient-experiences/patient-experience-of-primary-care-gp-services/latest"
  },
  {
    "label": "/health/patient-outcomes/cancer-diagnosis-at-an-early-stage/latest",
    "url": domain + "/health/patient-outcomes/cancer-diagnosis-at-an-early-stage/latest"
  },
  {
    "label": "/health/physical-and-mental-health/adults-reporting-suicidal-thoughts-attempts-and-self-harm/latest",
    "url": domain + "/health/physical-and-mental-health/adults-reporting-suicidal-thoughts-attempts-and-self-harm/latest"
  },
  {
    "label": "/health/preventing-illness/absence-of-tooth-decay-in-5-year-olds/latest",
    "url": domain + "/health/preventing-illness/absence-of-tooth-decay-in-5-year-olds/latest"
  },
  {
    "label": "/work-pay-and-benefits",
    "url": domain + "/work-pay-and-benefits"
  },
  {
    "label": "/work-pay-and-benefits/employment/employment/latest",
    "url": domain + "/work-pay-and-benefits/employment/employment/latest"
  },
  {
    "label": "/work-pay-and-benefits/unemployment-and-economic-inactivity/unemployment/latest",
    "url": domain + "/work-pay-and-benefits/unemployment-and-economic-inactivity/unemployment/latest"
  },
  {
    "label": "/work-pay-and-benefits/pay-and-income/average-hourly-pay/latest",
    "url": domain + "/work-pay-and-benefits/pay-and-income/average-hourly-pay/latest"
  },
  {
    "label": "/work-pay-and-benefits/benefits/state-support/latest",
    "url": domain + "/work-pay-and-benefits/benefits/state-support/latest"
  },
  {
    "label": "/housing",
    "url": domain + "/housing"
  },
  {
    "label": "/housing/owning-and-renting/time-spent-living-in-current-home/latest",
    "url": domain + "/housing/owning-and-renting/time-spent-living-in-current-home/latest"
  },
  {
    "label": "/housing/social-housing/new-social-housing-lettings/latest",
    "url": domain + "/housing/social-housing/new-social-housing-lettings/latest"
  },
  {
    "label": "/housing/homelessness/statutory-homelessness/latest",
    "url": domain + "/housing/homelessness/statutory-homelessness/latest"
  },
  {
    "label": "/housing/housing-conditions/overcrowded-households/latest",
    "url": domain + "/housing/housing-conditions/overcrowded-households/latest"
  },
  {
    "label": "/education-skills-and-training",
    "url": domain + "/education-skills-and-training"
  },
  {
    "label": "/education-skills-and-training/early-years/attainment-of-development-goals-by-children-aged-4-to-5-years/latest",
    "url": domain + "/education-skills-and-training/early-years/attainment-of-development-goals-by-children-aged-4-to-5-years/latest"
  },
  {
    "label": "/education-skills-and-training/5-to-7-years-old/phonics-attainments-for-children-aged-5-to-7-key-stage-1/latest",
    "url": domain + "/education-skills-and-training/5-to-7-years-old/phonics-attainments-for-children-aged-5-to-7-key-stage-1/latest"
  },
  {
    "label": "/education-skills-and-training/7-to-11-years-old/reading-attainments-for-children-aged-7-to-11-key-stage-2/latest",
    "url": domain + "/education-skills-and-training/7-to-11-years-old/reading-attainments-for-children-aged-7-to-11-key-stage-2/latest"
  },
  {
    "label": "/education-skills-and-training/11-to-16-years-old/pupil-progress-progress-8-between-ages-11-and-16-key-stage-2-to-key-stage-4/latest",
    "url": domain + "/education-skills-and-training/11-to-16-years-old/pupil-progress-progress-8-between-ages-11-and-16-key-stage-2-to-key-stage-4/latest"
  },
  {
    "label": "/education-skills-and-training/a-levels/students-aged-16-to-18-achieving-3-a-grades-or-better-at-a-level/latest",
    "url": domain + "/education-skills-and-training/a-levels/students-aged-16-to-18-achieving-3-a-grades-or-better-at-a-level/latest"
  },
  {
    "label": "/education-skills-and-training/apprenticeships-further-and-higher-education/further-education-participation/latest",
    "url": domain + "/education-skills-and-training/apprenticeships-further-and-higher-education/further-education-participation/latest"
  },
  {
    "label": "/education-skills-and-training/after-education/destinations-of-school-pupils-after-key-stage-4-usually-aged-16-years/latest",
    "url": domain + "/education-skills-and-training/after-education/destinations-of-school-pupils-after-key-stage-4-usually-aged-16-years/latest"
  },
  {
    "label": "/education-skills-and-training/absence-and-exclusions/absence-from-school/latest",
    "url": domain + "/education-skills-and-training/absence-and-exclusions/absence-from-school/latest"
  },
  {
    "label": "/culture-and-community",
    "url": domain + "/culture-and-community"
  },
  {
    "label": "/culture-and-community/community/feeling-of-belonging-to-britain/latest",
    "url": domain + "/culture-and-community/community/feeling-of-belonging-to-britain/latest"
  },
  {
    "label": "/culture-and-community/digital/internet-use/latest",
    "url": domain + "/culture-and-community/digital/internet-use/latest"
  },
  {
    "label": "/culture-and-community/culture-and-heritage/adults-taking-part-in-the-arts/latest",
    "url": domain + "/culture-and-community/culture-and-heritage/adults-taking-part-in-the-arts/latest"
  },
  {
    "label": "/culture-and-community/civic-participation/influencing-local-decisions/latest",
    "url": domain + "/culture-and-community/civic-participation/influencing-local-decisions/latest"
  },
  {
    "label": "/culture-and-community/transport/driving-licences/latest",
    "url": domain + "/culture-and-community/transport/driving-licences/latest"
  },
  {
    "label": "/crime-justice-and-the-law",
    "url": domain + "/crime-justice-and-the-law"
  },
  {
    "label": "/crime-justice-and-the-law/policing/confidence-in-the-local-police/latest",
    "url": domain + "/crime-justice-and-the-law/policing/confidence-in-the-local-police/latest"
  },
  {
    "label": "/crime-justice-and-the-law/crime-and-reoffending/victims-of-crime/latest",
    "url": domain + "/crime-justice-and-the-law/crime-and-reoffending/victims-of-crime/latest"
  },
  {
    "label": "/crime-justice-and-the-law/courts-sentencing-and-tribunals/employment-tribunal-claims/latest",
    "url": domain + "/crime-justice-and-the-law/courts-sentencing-and-tribunals/employment-tribunal-claims/latest"
  },
  {
    "label": "/crime-justice-and-the-law/prison-and-custody-incidents/violence-involving-prisoners/latest",
    "url": domain + "/crime-justice-and-the-law/prison-and-custody-incidents/violence-involving-prisoners/latest"
  },
  {
    "label": "/privacy-policy",
    "url": domain + "/privacy-policy"
  },
  {
    "label": "/cookies",
    "url": domain + "/cookies"
  },
  {
    "label": "/search",
    "url": domain + "/search"
  },
  {
    "label": "/background",
    "url": domain + "/background"
  },
  {
    "label": "/ethnicity-in-the-uk",
    "url": domain + "/ethnicity-in-the-uk"
  },
  {
    "label": "/ethnicity-in-the-uk/ethnicity-and-type-of-family-or-household",
    "url": domain + "/ethnicity-in-the-uk/ethnicity-and-type-of-family-or-household"
  },
  {
    "label": "/ethnicity-in-the-uk/ethnic-groups-and-data-collected",
    "url": domain + "/ethnicity-in-the-uk/ethnic-groups-and-data-collected"
  },
  {
    "label": "/ethnicity-in-the-uk/ethnic-groups-by-place-of-birth",
    "url": domain + "/ethnicity-in-the-uk/ethnic-groups-by-place-of-birth"
  },
  {
    "label": "/ethnicity-in-the-uk/ethnic-groups-by-sexual-identity",
    "url": domain + "/ethnicity-in-the-uk/ethnic-groups-by-sexual-identity"
  }
]

if (process.env.BACKSTOP_INCLUDE_CMS !== '') {
  scenarios.concat([
    {
      
    },
  ])
}

module.exports = {
  "id": "backstop_rdu",
  "viewports": [
  {
    "label": "desktop",
    "width": 1366,
    "height": 768
  }
  ],
  "onReadyScript": "onReady.js",
  "scenarios": scenarios,
  "paths": {
  "bitmaps_reference": "backstop_data/bitmaps_reference",
  "bitmaps_test": "backstop_data/bitmaps_test",
  "engine_scripts": "backstop_data/engine_scripts/casper",
  "html_report": "backstop_data/html_report"
  },
  "report": [],
  "engine": "phantomjs",
  "engineFlags": [],
  "debug": false,
  "debugWindow": false
}
