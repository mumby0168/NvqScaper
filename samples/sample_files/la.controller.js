$(document).ready(function(){

	// http://stackoverflow.com/questions/11803215/how-to-include-multiple-js-files-using-jquery-getscript-method
	// Note: need to change to .ajax[type=script] as .getScript appends time stamps which breaks any caching
	$.getMultiScripts = function(arr) {
		var _arr = $.map(arr, function(scr) {
			return $.getScript( scr );
		});
		_arr.push($.Deferred(function( deferred ){
			$( deferred.resolve );
		}));
		return $.when.apply($, _arr);
	}

	var pathname = window.location.pathname.toLowerCase();
	var webpath = pathname.substring(0, pathname.lastIndexOf('/')+1);

	var arrReqJSFiles = [];
	var arrReqJSCallbacks = [];

	//alert(pathname);
	switch(pathname){
		case '/views/homepage/':
		case '/views/homepage/index.cfm':
			arrReqJSFiles.push('/views/homepage/assets/module.js');
			arrReqJSCallbacks.push(['objHomepage','init']);
			break;
		case '/views/course/contact-diary/':
		case '/views/course/contact-diary/index.cfm':
			arrReqJSFiles.push('/views/course/assets/course.js');
			arrReqJSFiles.push('/views/course/assets/contact-diary.js');
			arrReqJSFiles.push('/views/appointments/assets/module.js');
			arrReqJSCallbacks.push(['objContactDiary','init']);
			break;
		case '/views/course/contact-diary/entry/':
		case '/views/course/contact-diary/entry/index.cfm':
			arrReqJSFiles.push('/views/course/assets/contact-diary.js');
			arrReqJSFiles.push('/views/course/assets/contact-diary-entry.js');
			arrReqJSFiles.push('/views/course/assets/ratings.js');
			arrReqJSCallbacks.push(['objContactDiaryEntry','init']);
			arrReqJSCallbacks.push(['objContactDiary','init']);
			break;
		case '/views/course/contact-diary/copy/':
		case '/views/course/contact-diary/copy/index.cfm':
			arrReqJSFiles.push('/views/course/assets/contact-diary-copy.js');
			arrReqJSCallbacks.push(['objContactDiaryCopy','init']);
			break;
		case '/views/user/journey/':
		case '/views/user/journey/index.cfm':
			arrReqJSFiles.push('/views/course/assets/contact-diary.js');
			arrReqJSFiles.push('/views/user/assets/journey.js');
			arrReqJSFiles.push('/views/course/assets/ratings.js');
			arrReqJSFiles.push('/views/appointments/assets/module.js');
			arrReqJSCallbacks.push(['objJourney','init']);
			arrReqJSCallbacks.push(['objCourseRatings','init']);
			arrReqJSCallbacks.push(['objContactDiary','init']);
			break;
		case '/views/appointments/':
		case '/views/appointments/index.cfm':
			arrReqJSFiles.push('/views/appointments/assets/module.js');
			arrReqJSCallbacks.push(['objAppointments','init']);
			break;
		case '/views/appointments/entry/':
		case '/views/appointments/entry/index.cfm':
			arrReqJSFiles.push('/views/appointments/assets/module.js');
			arrReqJSCallbacks.push(['objAppointmentEntry','init']);
			break;
		case '/views/course/registration-form/':
		case '/views/course/registration-form/index.cfm':
			arrReqJSFiles.push('/views/course/assets/course.js');
			break;
		case '/views/course/evidence-folder/':
		case '/views/course/evidence-folder/index.cfm':
			arrReqJSFiles.push('/views/course/assets/course.js');
			arrReqJSFiles.push('/views/course/assets/evidence-folder.js');
			arrReqJSCallbacks.push(['objEvidenceFolder','init']);
			break;
		case '/views/course/reviews/index.cfm':
		case '/views/course/reviews/':
			arrReqJSFiles.push('/views/course/assets/reviews.js');
			arrReqJSCallbacks.push(['objReviews','init']);
			break;
		case '/views/course/metrics/index.cfm':
		case '/views/course/metrics/':
			arrReqJSFiles.push('/views/course/assets/metrics.js');
			arrReqJSCallbacks.push(['objMetrics','init']);
			break;
		case '/views/cohorts/index.cfm':
		case '/views/cohorts/':
			arrReqJSFiles.push('/views/cohorts/assets/cohorts.js');
			arrReqJSCallbacks.push(['objCohorts','init']);
			break;
		case '/course/course_folder.cfm':
			arrReqJSFiles.push('/views/course/assets/course.js');
			arrReqJSCallbacks.push(['objViewCourse','init']);
			arrReqJSCallbacks.push(['objDeadlines','init']);
			break;
		case '/course/view_unit.cfm':
			arrReqJSFiles.push('/views/course/assets/course.js');
			arrReqJSFiles.push('/views/course/assets/contact-diary.js');
			arrReqJSFiles.push('/views/appointments/assets/module.js');
			arrReqJSFiles.push('/views/course/assets/evidence-folder.js');
			arrReqJSCallbacks.push(['objViewUnit','init']);
			arrReqJSCallbacks.push(['objViewQuicklinks','init']);
			arrReqJSCallbacks.push(['objDeadlines','init']);
			arrReqJSCallbacks.push(['objContactDiary','init']);
			arrReqJSCallbacks.push(['_tasks','init']);
			arrReqJSCallbacks.push(['objEvidenceFolder','init']);
			break;
		case '/course/view_element.cfm':
			arrReqJSFiles.push('/views/course/assets/course.js');
			arrReqJSFiles.push('/views/course/assets/contact-diary.js');
			arrReqJSFiles.push('/views/appointments/assets/module.js');
			arrReqJSCallbacks.push(['objViewElement','init']);
			arrReqJSCallbacks.push(['objViewQuicklinks','init']);
			arrReqJSCallbacks.push(['objDeadlines','init']);
			arrReqJSCallbacks.push(['objContactDiary','init']);
			arrReqJSCallbacks.push(['objForms','init']);
			break;
		case '/views/processes/course.cfm':
		case '/views/processes/':
		case '/views/processes/index.cfm':
			arrReqJSFiles.push('/views/processes/assets/module.js');
			arrReqJSCallbacks.push(['objProcessesGeneral','init']);
			break;
		case '/views/connect/exams/':
		case '/views/connect/exams/index.cfm':
			arrReqJSFiles.push('/views/connect/assets/exam-booking.js');
			arrReqJSCallbacks.push(['objExamBooking','init']);
			break;
		case '/views/connect/exam-booking/':
		case '/views/connect/exam-booking/index.cfm':
			arrReqJSFiles.push('/views/connect/assets/exam-booking-manager.js');
			arrReqJSCallbacks.push(['objExamBookingManager','init']);
			break;
		case '/views/connect/order-summary/':
		case '/views/connect/order-summary/index.cfm':
			arrReqJSFiles.push('/views/connect/assets/order-summary.js');
			arrReqJSCallbacks.push(['objOrderSummary','init']);
			break;
		case '/views/sampling-summary/':
		case '/views/sampling-summary/index.cfm':
			arrReqJSFiles.push('/views/sampling-summary/assets/module.js');
			arrReqJSFiles.push('/views/sampling-summary/assets/module-info.js');
			arrReqJSFiles.push('/views/sampling-summary/assets/sampling.js');
			arrReqJSCallbacks.push(['objSampling','init']);
			arrReqJSCallbacks.push(['objSamplingInfo','init']);
			arrReqJSCallbacks.push(['objSamplingPlan','init']);
			arrReqJSCallbacks.push(['objSamplingReports','init']);
			break;
		case '/views/sampling-summary/reports/':
		case '/views/sampling-summary/reports/index.cfm':
		case '/views/sampling-summary/plans/':
		case '/views/sampling-summary/plans/index.cfm':
			arrReqJSFiles.push('/views/sampling-summary/assets/sampling.js');
			arrReqJSCallbacks.push(['objSamplingPlan','init']);
			arrReqJSCallbacks.push(['objSamplingReports','init']);
			break;
		case '/views/course/unit-selector/':
		case '/views/course/unit-selector/index.cfm':
			arrReqJSFiles.push('/views/course/unit-selector/assets/module.js');
			arrReqJSCallbacks.push(['objUnitSelector','init']);
			break;
		case '/views/course/unit-selector/chosen-units.cfm':
			arrReqJSFiles.push('/views/course/unit-selector/assets/chosen-units.js');
			arrReqJSCallbacks.push(['objChosenUnits','init']);
			break;
		case '/views/learners/':
		case '/views/learners/index.cfm':
			arrReqJSFiles.push('/views/learners/assets/module.js');
			arrReqJSFiles.push('/views/course/assets/ratings.js');
			arrReqJSCallbacks.push(['objLearners','init']);
			arrReqJSCallbacks.push(['objCourseRatings','init']);
			break;
		case '/views/evaluation/manager.cfm':
			arrReqJSFiles.push('/views/evaluation/assets/module.js');
			arrReqJSCallbacks.push(['objEvaluations','init']);
			break;
		case '/views/settings/':
		case '/views/settings/index.cfm':
			arrReqJSFiles.push('/views/settings/assets/module.js');
			arrReqJSCallbacks.push(['objSettingsManager','init']);
			break;
		case '/views/settings/resources/popups/move.cfm':
			arrReqJSFiles.push('/views/settings/assets/module.js');
			arrReqJSCallbacks.push(['objMoveAsset','init']);
			break;
		case '/views/settings/resources/popups/mapping.cfm':
			arrReqJSFiles.push('/views/settings/assets/module.js');
			arrReqJSCallbacks.push(['objMapAsset','init']);
			break;
		case '/views/user/trace/':
		case '/views/user/trace/index.cfm':
			arrReqJSFiles.push('/views/user/assets/trace.js');
			arrReqJSCallbacks.push(['objTrace','init']);
			break;
		case '/views/pdr/':
		case '/views/pdr/index.cfm':
			arrReqJSFiles.push('/views/pdr/assets/module.js');
			arrReqJSCallbacks.push(['objPDR','init']);
			break;
		case '/views/packages/':
		case '/views/packages/index.cfm':
			arrReqJSFiles.push('/views/packages/assets/module.js');
			arrReqJSCallbacks.push(['objPackage','init']);
			break;
		case '/views/custom/group-inactivation/':
		case '/views/custom/group-inactivation/index.cfm':
			arrReqJSFiles.push('/views/custom/assets/module.js');
			arrReqJSCallbacks.push(['objGroupInactivation','init']);
			break;
		case '/views/custom/learner-claim/':
		case '/views/custom/learner-claim/index.cfm':
			arrReqJSFiles.push('/views/custom/assets/module.js');
			arrReqJSCallbacks.push(['objCandidateClaim','init']);
			break;
		case '/views/custom/learner-claim/claim.cfm':
			arrReqJSFiles.push('/views/custom/assets/module.js');
			arrReqJSCallbacks.push(['objCandidateClaimConfirm','init']);
			break;
		// case '/views/user/preferences/':
		// case '/views/user/preferences/index.cfm':
		// 	arrReqJSFiles.push('/views/user/assets/preferences.js');
		// 	arrReqJSCallbacks.push(['objUserPreferences','init']);
		case '/views/debug/progress.cfm':
			arrReqJSFiles.push('/views/debug/assets/module.js');
			arrReqJSCallbacks.push(['objProgressAnalyzer','init']);
			break;
		case '/views/processes/item-activity.cfm':
			arrReqJSFiles.push('/views/course/assets/contact-diary.js');
			arrReqJSFiles.push('/views/processes/assets/module.js');
			break;
		case '/views/course/walledgarden/index.cfm':
			arrReqJSFiles.push('/views/course/walledgarden/assets/module.js');
			arrReqJSCallbacks.push(['objWalledGarden','init']);
			break;
		case '/views/admin/group-enrolment/':
		case '/views/admin/group-enrolment/index.cfm':
			arrReqJSFiles.push('/views/admin/group-enrolment/assets/module.js');
			arrReqJSCallbacks.push(['objGroupEnrolment','init']);
			break;
		}
	// section JS (use this block if you want to push JS to a whole folder)
	switch(webpath){
		case '/views/moderation/':
			//arrReqJSFiles.push('/views/moderation/assets/evidence.js');
			//arrReqJSFiles.push('/views/moderation/assets/contact-diary.js');
			arrReqJSFiles.push('/views/moderation/assets/module.js');
			arrReqJSFiles.push('/views/notes/assets/module.js');
			arrReqJSCallbacks.push(['objModeration','init']);
			arrReqJSCallbacks.push(['objNotes','init']);
			break;
		case '/views/notes/':
			arrReqJSFiles.push('/views/notes/assets/module.js');
			arrReqJSCallbacks.push(['objNotes','init']);
			arrReqJSFiles.push('/assets/V2/plugins/plupload/2.3.1/plupload.full.min.js');
			arrReqJSFiles.push('/assets/V2/js/la.plupload.js');
			arrReqJSCallbacks.push(['LA_Plupload','init']);
			break;
	}

	if( arrReqJSFiles.length ){
		$.getMultiScripts(arrReqJSFiles).done(function(){
			if( arrReqJSCallbacks.length ){
				for (var i = 0; i < arrReqJSCallbacks.length; i++){
					try { 
						window[arrReqJSCallbacks[i][0]][arrReqJSCallbacks[i][1]](strMasterData.stuAdditionalPageParams); 
					} catch(err){ 
						console.log(err); 
					}
				}
			}
		});
	}

});