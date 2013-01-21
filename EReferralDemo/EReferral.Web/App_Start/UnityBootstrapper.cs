using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc3;
using EReferral.Service;
using System.Web.Http;

namespace EReferral.Web
{
    public static class UnityBootstrapper
    {
        public static void Initialise(HttpConfiguration config, IUnityContainer container = null)
        {
            container = container ?? BuildUnityContainer();

            // for mvc controller
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            // for webapi controller
            config.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            container.RegisterType<IReferralService, ReferralService>();
            container.RegisterType<IXdsService, XdsService>();

            return container;
        }
    }
}