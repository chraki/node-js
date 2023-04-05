'use strict';

const STATUS_CODES = {
   OK: '200',
   UNAUTHORIZED: '401',
   EXPACTATION_FAILURE: '417',
   INVALID_ENTITY: '422',
   INTERNAL_ERROR: '500',
   BAD_REQUEST: '400',
   PRECONDITION_FAILED: '412',
   NO_CONTENT: '204',
   FORBIDDEN: '403',
   NOT_FOUND: '404',
   ACCEPTED: '202'
};

const STATUS = {
   200: 'Ok',
   201: 'Created',
   204: 'No Content',
   400: 'Bad Request',
   401: 'Unauthorized',
   412: 'Precondition Failed',
   417: 'Expectation Failed',
   422: 'Unprocessable Entity',
   500: 'Internal Server Error',
   403: 'Forbidden',
   404: 'Not Found',
   202: 'Accepted'
};

const LOGGER = {
   DATE_PATTERN: 'YYYY-MM-DD',
   MAX_FILE_SIZE: '5m',
   LOG_FILE_ALIVE_TIME: '14d'
};

const DATABASE_DEFAULTS = {
   NUMBER: 0,
   STRING: '-'
};

const GENDER_VALUES = {
   Male: 'Male',
   Female: 'Female',
   Other:'Other'
};

const MARITAL_STATUS = {
   Married:'Married',
   Unmarried:'Unmarried',
   Other:'Other'
};

const EMAIL_TEMPLATE_IDS ={
   PARTNER_LOGO_VERIFICATION: 111,
   PARTNER_LOGO_REJECTION: 112,
   SEND_OTP_STUDENT:131,
   ACCOMMODATION_INTERNAL_MEMBER: 129,
   ACCOMMODATION_PARTNER: 130,
   STUDENT_EDIT_PROFILE:150,
   STUDY_LINK_DOCUMENTS_UPLOAD: 160,
   APPLICATION_REPUSH_SUCCESS: 161,
   APPLICATION_REPUSH_FAILURE: 162
};

const COURSE_FINDER_PAGES={
   EDIT_PROFILE :'StudentApplications/EditProfile',
   APPLICATION_VIEW : 'Application/View'
};

const BACKEND_APIS={
   UNIVERSITY_SERVICE:{
      UNIVERSITY_DETAILS_BY_COURSE_ID: '/v1/universities-courses',
      UNIVERSITY_LIST: '/v1/university-list',
      GET_UNIVERSITY_COURSES: '/v1/courses'
   },
   ACCOUNTS_SERVICE:{
      GET_PARTNER_INFO_BY_ID:'/v1/accounts/:id',
      GET_PARTNER_NAME_BY_PARTNER_ID:'/v1/accounts',
      GET_PARTNER_DETAILS:'/v1/search-partner',
      GET_SPECIFIC_USER_TAG: '/v1/accounts/:id/tags',
      GET_PARTNER_BANK_DETAILS: '/v1/partner-bank-details',
      GET_USER_SIGNATURE_BY_ID: '/v1/user-signature'
   },
   STUDENTS_SERVICE:{
      GET_INVOICE_STUDENTS: '/v1/invoice/students',
      GET_STUDENT_COUNT: '/v1/invoice/student-count',
      GET_COMMISSION_PENDING_STUDENTS: 
      '/v1/invoice/student-course-details',
      GET_INVOICE_UNIVERSITY_LIST: '/v1/invoice/university-List',
      GET_INVOICE_DETAILS: '/v1/invoice',
      GET_GENERATED_INVOICE_LIST: '/v1/invoice/generated-invoices',
      GET_UNIVERSITY_INVOICES: '/v1/university-invoices',
      GET_INVOICE_HISTORY: '/v1/invoices/:invoice_id/history',
      GET_COMMISSION_NOTE_UNIVERSITY_LIST: '/v1/cn/universities-list',
      GET_COMMISSION_NOTE_STUDENT_LIST:'/v1/cn/students-list',
      GET_COMMISSION_NOTE_LIST_BASED_ON_USER_ROLE:'/v1/cn/list-based-on-users',
      GET_COMMISSION_NOTES:'/v1/cn/list',
      GET_COMMISSION_NOTE_DETAILS: '/v1/cn/:commissionNoteId',
      GET_STUDENT_DETAILS: '/v1/students/student-applications',
      GET_COUNTRY_DATA: '/v1/country-lookup-value/{{country_id}}',
      GET_DOCUMENTS_LIST: '/v1/student-documents-list/{{student_id}}',
      GET_STUDENTS_IN_COMMISSION_NOTE:'/v1/cn/:commissionNoteId/students'
   }
};

const SECRET_KEY_OF ={
   // jwt payload key
   JWT_PAYLOAD:'You can count on me'
};

const USER_ROLES = {
   STUDENT:'student'
};

const REDIS_KEYS = {
   USER_TAGS: 'TAGS_{{USER_ID}}'
};

const FERNET_ENCRYPTION_IV=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

module.exports = { 
   STATUS_CODES, 
   STATUS, 
   LOGGER, 
   DATABASE_DEFAULTS, 
   GENDER_VALUES, 
   MARITAL_STATUS,
   EMAIL_TEMPLATE_IDS,
   COURSE_FINDER_PAGES,
   SECRET_KEY_OF,
   USER_ROLES,
   BACKEND_APIS,
   REDIS_KEYS,
   FERNET_ENCRYPTION_IV
};
