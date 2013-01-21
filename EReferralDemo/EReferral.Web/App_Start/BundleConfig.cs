using System.Web;
using System.Web.Optimization;

namespace EReferral.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            /* =================================================================
             * JavaScripts 
             * ================================================================= */

            // external libraries
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/Libs/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/extlibs")
                                .Include( "~/Scripts/Libs/json2.js"
                                        , "~/Scripts/Libs/jquery-{version}.js"
                                        , "~/Scripts/Libs/jquery.unobtrusive*"
                                        , "~/Scripts/libs/jquery.validate*"
                                        , "~/Scripts/Libs/jquery-ui-{version}.js"
                                        , "~/Scripts/Libs/jquery.scrollTo-1.4.2.js"
                                        , "~/Scripts/Libs/knockout-2.1.0.js"
                                        , "~/Scripts/Libs/knockout.mapping-latest.debug.js"
                                        , "~/Scripts/Libs/koExternalTemplateEngine_all.js"
                                        , "~/Scripts/Libs/sammy/sammy.js"
                                        , "~/Scripts/Libs/underscore.js"
                                        , "~/Scripts/Libs/plugins.js"
                                        , "~/Scripts/Libs/jquery.mockjson.js"
                                        , "~/Scripts/Libs/toastr.js"
                                        , "~/Scripts/Libs/moment.js"));

            // internal libraries (ex: jquery plugin)
            bundles.Add(new ScriptBundle("~/bundles/intlibs")
                            .Include( "~/Scripts/Libs/jquery.ereferral.expander.js"
                                    , "~/Scripts/Libs/jquery.ereferral.viewer.js"
                                    , "~/Scripts/Libs/jquery.ereferral.zoom.js"
                                    , "~/Scripts/Libs/jquery.ereferral.restore.js"
                                    , "~/Scripts/Libs/jquery.ereferral.move.js"
                                    , "~/Scripts/Libs/jquery.ereferral.background.js"
                                    , "~/Scripts/Libs/jquery.ereferral.magnify.js"
                                    , "~/Scripts/Libs/jquery.ereferral.viewer.js"
                                    , "~/Scripts/Libs/jquery.ereferral.single_click.js"
                                    , "~/Scripts/Libs/jquery.ereferral.table.js"));


            // shared scripts
            bundles.Add(new ScriptBundle("~/bundles/shared").Include("~/Scripts/main.js", "~/Scripts/common.js"));

            // views
            bundles.Add(new ScriptBundle("~/bundles/view/referral-index").Include("~/Scripts/Views/referral-index-view.js"));
            bundles.Add(new ScriptBundle("~/bundles/view/search-index").Include("~/Scripts/Views/search-index-view.js"));
            bundles.Add(new ScriptBundle("~/bundles/view/doc-index").Include("~/Scripts/Views/doc-index-view.js"));
            
            // data services
            bundles.Add(new ScriptBundle("~/bundles/dataService/referral-ds").Include("~/Scripts/DataServices/referral-ds.js")); 
            bundles.Add(new ScriptBundle("~/bundles/dataService/patient-ds").Include("~/Scripts/DataServices/patient-ds.js"));
            bundles.Add(new ScriptBundle("~/bundles/dataService/document-ds").Include("~/Scripts/DataServices/document-ds.js"));

            // view-models
            bundles.Add(new ScriptBundle("~/bundles/viewModel/referral-index-vm").Include("~/Scripts/ViewModels/referral-index-vm.js"));
            bundles.Add(new ScriptBundle("~/bundles/viewModel/search-index-vm").Include("~/Scripts/ViewModels/search-index-vm.js"));
            bundles.Add(new ScriptBundle("~/bundles/viewModel/doc-index-vm").Include("~/Scripts/ViewModels/doc-index-vm.js"));

            // routers
            bundles.Add(new ScriptBundle("~/bundles/router/referral-index-router").Include("~/Scripts/Routers/referral-index-router.js"));
            bundles.Add(new ScriptBundle("~/bundles/router/search-index-router").Include("~/Scripts/Routers/search-index-router.js"));
            bundles.Add(new ScriptBundle("~/bundles/router/doc-index-router").Include("~/Scripts/Routers/doc-index-router.js"));


            /* =================================================================
             * CSS
             * ================================================================= */
            
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/style.css", "~/Content/top.css", "~/Content/toastr.css", "~/Content/toastr-responsive.css"));
            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
            // jQueryUI redmond theme
            bundles.Add(new StyleBundle("~/Content/themes/redmond/css").Include("~/Content/themes/redmond/jquery-ui-1.8.22.custom.css"));

            bundles.Add(new StyleBundle("~/Content/referral-index").Include("~/Content/referral-index.css"));
            bundles.Add(new StyleBundle("~/Content/search-index").Include("~/Content/search-index.css"));
            //bundles.Add(new StyleBundle("~/Content/doc-index").Include(
            //    "~/Content/doc-index.css",
            //    "~/Content/doc-index-list.css",
            //    "~/Content/doc-index-viewer.css"));

            bundles.Add(new StyleBundle("~/Content/doc-index").Include(
                "~/Content/doc-index-less.css",
                "~/Content/doc-index-list.css",
                "~/Content/doc-index-viewer.css"));

        }
    }
}