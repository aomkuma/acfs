<?php
    
    namespace App\Service;
    
    use App\Model\Meeting;
    use App\Model\MeetingAttendee;
    use App\Model\InviteFile;
    use App\Model\MeetingFile;
    use App\Model\MOMFile;


    use Illuminate\Database\Capsule\Manager as DB;
    
    class MeetingService {

        public static function getMailSchedule(){
            return Meeting::where('sentEmailStatus', 'TimeSetting')
                        ->where('emailSentDate', '<=', date('Y-m-d H:i:s'))
                        ->where('isSendMail', 'N')
                        ->get();
        }

        public static function updateSentEmailStatus($meetingID){
            return Meeting::where('meetingID', $meetingID)->update(['isSendMail' => 'Y']);
        }

    	public static function getList($standardID,$menuType){
            return Meeting::where('standardID', $standardID)
                    ->where('menuType', $menuType)
                    ->with('meetingAttendees')
                    ->with('momFile')
                    ->with('meetingFile')
                    ->with('inviteFile')
                    ->get();
        }

        public static function getListForHomepageAdmin(){
            return Meeting::groupBy('Meetings.meetingID')
                        ->with('momFile')
                        ->with('meetingFile')
                        ->with('inviteFile')
                        ->get();
        }

        public static function getListForHomepage($userID){
            return Meeting::where(function($query) use ($userID){
                            if(!empty($userID)){
                                $query->where('Meeting_attendees.attendeeID', $userID);
                            }
                        })
                        ->join("Meeting_attendees", 'Meeting_attendees.meetingID', '=', 'Meetings.meetingID')
                        ->groupBy('Meetings.meetingID')
                        ->with('momFile')
                        ->with('meetingFile')
                        ->with('inviteFile')
                        ->get();
        }

        public static function getListForHomepageAcademicBoard($userID){
            return Meeting::where(function($query) use ($userID){
                            if(!empty($userID)){
                                $query->where('Academic_Boards.stakeholderID', $userID);
                            }
                        })
                        ->join("Commodity_Standards", 'Commodity_Standards.standardID', '=', 'Meetings.standardID')
                        ->join("Academic_Boards", 'Academic_Boards.standardID', '=', 'Meetings.standardID')
                        ->groupBy('Meetings.meetingID')
                        ->with('momFile')
                        ->with('meetingFile')
                        ->with('inviteFile')
                        ->get();
        }

        public static function getListForHomepageSubcommittee($userID){
            return Meeting::where(function($query) use ($userID){
                            if(!empty($userID)){
                                $query->where('Subcommittee_Person.stakeholderID', $userID);
                            }
                        })
                        ->join("Subcommittee", 'Subcommittee.subcommitteeID', '=', 'Meetings.standardID')
                        ->join("Subcommittee_Person", 'Subcommittee_Person.subcommitteeID', '=', 'Meetings.standardID')
                        ->groupBy('Meetings.meetingID')
                        ->with('momFile')
                        ->with('meetingFile')
                        ->with('inviteFile')
                        ->get();
        }

        public static function getData($meetingID){
            return Meeting::find($meetingID);
                    // ->with('meetingAttendees')
                    // ->with('momFile')
                    // ->with('meetingFile')
                    // ->with('inviteFile');
        }

        public static function getAttendee($meetingID){
            return MeetingAttendee::select("nameThai"
                        ,"lastNameThai"
                        ,"positionThai"
                        ,"email"
                        ,"Meeting_attendees.*")
                    ->where('Meeting_attendees.meetingID', $meetingID)
                    ->join("Stakeholders", "Stakeholders.stakeholderID", '=', "Meeting_attendees.attendeeID")
                    ->get();
        }

        public static function updateData($obj){
            if(empty($obj['meetingID'])){
                $obj['createDate'] = date('Y-m-d H:i:s');
                $obj['updateDate'] = date('Y-m-d H:i:s');
                $model = Meeting::create($obj);
                return $model->meetingID;
            }else{
                unset($obj['createBy']);
                $obj['updateDate'] = date('Y-m-d H:i:s');
                Meeting::where('meetingID', $obj['meetingID'])->update($obj);
                return $obj['meetingID'];
            }
        }

        public static function addMOMFile($obj){
            $model = MOMFile::create($obj);
                return $model->meetingFileID;
        }

        public static function addMeetingFile($obj){
            $model = MeetingFile::create($obj);
                return $model->meetingFileID;
        }

        public static function addAttendee($obj){
            $model = MeetingAttendee::create($obj);
                return $model;
        }

        public static function deleteAttendee($meetingAttendeeID){
                return MeetingAttendee::find($meetingAttendeeID)->delete();
                
        }

        public static function addInviteFile($obj){
            $model = InviteFile::create($obj);
                return $model->inviteFileID;
        }

        public static function removeMeetingFile($meetingFileID){
            return MeetingFile::find($meetingFileID)->delete();
        }

        public static function removeInviteFile($inviteFileID){
            return InviteFile::find($inviteFileID)->delete();
        }

        public static function removeData($meetingID){
            return Meeting::find($meetingID)->delete();
        }

        public static function getMeetingFile($meetingID){
            return MeetingFile::where('meetingID', $meetingID)->get();
        }  

        public static function getInviteFile($meetingID){
            return InviteFile::where('meetingID', $meetingID)->get();
        }        

    }
