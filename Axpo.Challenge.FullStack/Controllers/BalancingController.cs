using Axpo.Challenge.Balancing.Model;
using Axpo.Challenge.Balancing.Service;
using Microsoft.AspNetCore.Mvc;

namespace Axpo.Challenge.FullStack.Controllers
{
    [Route("api/v1/balancing")]
    [ApiController]
    public class BalancingController : ControllerBase
    {
        private readonly IBalancingService _balancingService;
        public BalancingController(IBalancingService balancingService)
        {
            _balancingService = balancingService;
        }

        /// <summary>
        /// Gets Balancing Circles
        /// </summary>
        /// <returns>List of current Balancing Circles</returns>
        [HttpGet]
        public ActionResult<IEnumerable<BalancingCircle>> Get()
        {
            var balancingCicles = _balancingService.GetBalancingCircles();
            return Ok(balancingCicles);
        }

        /// <summary>
        /// Get forecast data for a given member
        /// </summary>
        /// <param name="id">Unique identifier of the member</param>
        /// <returns>Forecast data</returns>
        [HttpGet("member/{id}/forecast")]
        public ActionResult<ForecastData> GetMemberForecast(Guid id)
        {
            try
            {
                var forecast = _balancingService.GetForecasts(id);
                return Ok(forecast);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }


    }
}
