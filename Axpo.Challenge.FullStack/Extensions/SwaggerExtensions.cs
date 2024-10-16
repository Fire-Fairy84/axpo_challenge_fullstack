using System.Reflection;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.Extensions.DependencyInjection;

namespace Axpo.Challenge.FullStack.Extensions
{
    public static class SwaggerExtensions
    {
        private const string balancingTypeNameDocs = "Axpo.Challenge.Balancing.xml";

        public static void AddSwaggerConfiguration(this IServiceCollection services)
        {
            services.AddSwaggerGen(IncludeXMLDocs);
        }

        private static void IncludeXMLDocs(SwaggerGenOptions options)
        {
            var currentProject = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var currentProjectDocsPath = Path.Combine(AppContext.BaseDirectory, currentProject);
            var balancingTypeNameDocsPath = Path.Combine(AppContext.BaseDirectory, balancingTypeNameDocs);

            if (File.Exists(currentProjectDocsPath))
            {
                options.IncludeXmlComments(currentProjectDocsPath);
            }

            if (File.Exists(balancingTypeNameDocsPath))
            {
                options.IncludeXmlComments(balancingTypeNameDocsPath);
            }
        }
    }
}
