import {environment} from '../../environments/environment';
var BASE_URL = environment.api_url;
export const upload = environment.mergeapi_url + "uploadpdf";
export const mergepdf = environment.mergeapi_url + "getpdf";
export const checkbox_url = 'https://eprocessdevelopment.com/Draeger/QPT/PDFS/';
export const constant = {
    "pdf_modules" : BASE_URL+"drager_pdf_modules",
    "getquote"    : BASE_URL+"user_quotes?user_id=",
    "createquote" : BASE_URL+"create_quote",
    "submitpdf"   : BASE_URL+"up_quote_pdfs",
    "mergepdf"    : BASE_URL+"merging_pdfs",
    "updateQuote" : BASE_URL+"update_selected_quote",
    "showpdf"     : BASE_URL+"pdf_preview",
  "previousquote" : BASE_URL+"previous_quote",
    "cartdata"    : BASE_URL+"cart_data",
    "deleteQuote" : BASE_URL+"delete_quote"
};  






