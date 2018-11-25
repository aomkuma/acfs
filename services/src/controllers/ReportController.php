<?php

    namespace App\Controller;
    
    use App\Service\CommodityStandardService;
    use App\Service\AcademicBoardService;
    use App\Service\SubcommitteeService;
    use App\Service\StakeholderService;

    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

    class ReportController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function exportReport($request, $response, $args){
    //         error_reporting(E_ERROR);
    // error_reporting(E_ALL);
    // ini_set('display_errors','On');
    // var_dump(extension_loaded('zip'));
    // exit;
            try{
                $params = $request->getParsedBody();
                $condition = $params['obj']['condition'];
                $report_type = $params['obj']['report_type'];

                // $cacheMethod = \PHPExcel_CachedObjectStorageFactory::cache_in_memory_gzip;
                // $catch_result = \PHPExcel_Settings::setCacheStorageMethod($cacheMethod);

                // $objPHPExcel = new PHPExcel();


                $objPHPExcel = new Spreadsheet();

                switch($report_type){
                    case 'academic-board' : $objPHPExcel = $this->generateAcademicBoard($objPHPExcel, $condition); break;
                    case 'annual-plan' : $objPHPExcel = $this->generateAnnualPlan($objPHPExcel, $condition); break;
                    case 'questionnaire' : $objPHPExcel = $this->generateQuestionnaire($objPHPExcel, $condition); break;
                    case 'academicboardgroup' : $objPHPExcel = $this->generateAcademicBoardGroup($objPHPExcel, $condition); break;
                    case 'stackholder' : $objPHPExcel = $this->generateStackholder($objPHPExcel, $condition); break;
                    case 'subcommittee' : $objPHPExcel = $this->generateSubcommittee($objPHPExcel, $condition); break;
                    default : $result = null;
                }
                
                $filename = $report_type . '_' . date('YmdHis') . '.xlsx';
                $filepath = '../../files/files/downloads/' . $filename;
                
                // $objWriter = \PHPExcel_IOFactory::createWriter ( $objPHPExcel, 'Excel2007' );
                // $objWriter->setPreCalculateFormulas(); 
                
                // $objWriter->save ( $filepath );

                $objWriter = new Xlsx($objPHPExcel);
                $objWriter->save($filepath);
                
                $this->data_result['DATA'] = $filename;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        private function generateAcademicBoard($objPHPExcel, $condition){

            // get Commodity standard detail
            $standardID = $condition['Standard'];
            $CommodityStandard = CommodityStandardService::getCommodityStandard($standardID);

            // get Acedemic board by standard ID
            $AcademicBoard = AcademicBoardService::getAcademicBoardList($standardID);

            // generate data
            $objPHPExcel->getActiveSheet()->setCellValue('B2', 'ปีงบประมาณ');
            $objPHPExcel->getActiveSheet()->setCellValue('C2', $CommodityStandard['years']);
            $objPHPExcel->getActiveSheet()->setCellValue('D2', 'มาตรฐานสินค้าเกษตร : '. $CommodityStandard['standardNameThai']);

            $objPHPExcel->getActiveSheet()->setCellValue('D5', 'ชื่อคณะกรรมการ');
            $objPHPExcel->getActiveSheet()->setCellValue('E5', 'ตำแหน่ง');
            $objPHPExcel->getActiveSheet()->getStyle('D5')->getFont()->setBold(true);
            $objPHPExcel->getActiveSheet()->getStyle('E5')->getFont()->setBold(true);

            $row = 6;
            // Loop for details
            foreach ($AcademicBoard as $key => $value) {
                $objPHPExcel->getActiveSheet()->setCellValue('D' . $row, $value['nameThai'] . ' ' . $value['lastNameThai']);
                $objPHPExcel->getActiveSheet()->setCellValue('E' . $row, $value['positionThai']);
                $row++;
            }
            $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);

            $objPHPExcel->getActiveSheet()
            ->getStyle("D5:E" . $objPHPExcel->getActiveSheet()->getHighestRow())
            ->applyFromArray($this->getDefaultStyle());

            return $objPHPExcel;
        }

        private function generateAnnualPlan($objPHPExcel, $condition){

            // get Commodity standard detail
            $years = intval($condition['YearFrom']);
            $years += 543;
            $CommodityStandard = CommodityStandardService::getListActive($years);

            $objPHPExcel->getActiveSheet()->setCellValue('B2', 'รายงานแผนงานประจำปี');
            $objPHPExcel->getActiveSheet()->setCellValue('C2', $years);

            $objPHPExcel->getActiveSheet()->setCellValue('C5', 'มาตรฐานสินค้าเกษตร');
            $objPHPExcel->getActiveSheet()->getStyle('B2')->getFont()->setBold(true);
            $objPHPExcel->getActiveSheet()->getStyle('C2')->getFont()->setBold(true);
            $objPHPExcel->getActiveSheet()->getStyle('C5')->getFont()->setBold(true);

            $row = 6;
            foreach ($CommodityStandard as $key => $value) {
                $objPHPExcel->getActiveSheet()->setCellValue('C' . $row, $value['standardNameThai']);
                $row++;
            }

            $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);

            $objPHPExcel->getActiveSheet()
            ->getStyle("C5:C" . $objPHPExcel->getActiveSheet()->getHighestRow())
            ->applyFromArray($this->getDefaultStyle());

            return $objPHPExcel;

        }

        private function generateAcademicBoardGroup($objPHPExcel, $condition){

            // get Commodity standard detail
            $standardID = $condition['AcademicBoardGroup'];
            $CommodityStandard = CommodityStandardService::getCommodityStandard($standardID);

            // get Acedemic board by standard ID
            $AcademicBoard = AcademicBoardService::getAcademicBoardList($standardID);

            // generate data
            $objPHPExcel->getActiveSheet()->setCellValue('B3', 'ชื่อกลุ่ม');
            $objPHPExcel->getActiveSheet()->setCellValue('C3', $CommodityStandard['academicBoardName']);

            $objPHPExcel->getActiveSheet()->setCellValue('D5', 'ชื่อคณะกรรมการ');
            $objPHPExcel->getActiveSheet()->setCellValue('E5', 'ตำแหน่ง');
            $objPHPExcel->getActiveSheet()->getStyle('D5')->getFont()->setBold(true);
            $objPHPExcel->getActiveSheet()->getStyle('E5')->getFont()->setBold(true);

            $row = 6;
            // Loop for details
            foreach ($AcademicBoard as $key => $value) {
                $objPHPExcel->getActiveSheet()->setCellValue('D' . $row, $value['nameThai'] . ' ' . $value['lastNameThai']);
                $objPHPExcel->getActiveSheet()->setCellValue('E' . $row, $value['positionThai']);
                $row++;
            }
            $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);

            $objPHPExcel->getActiveSheet()
            ->getStyle("D5:E" . $objPHPExcel->getActiveSheet()->getHighestRow())
            ->applyFromArray($this->getDefaultStyle());

            return $objPHPExcel;
        }

        private function generateStackholder($objPHPExcel, $condition){

            // get Commodity standard detail
            $Branch = $condition['Branch'];
            // get Acedemic board by standard ID
            $AcademicBoard = StakeholderService::getListByBranch($Branch);

            // generate data
            $objPHPExcel->getActiveSheet()->setCellValue('B3', 'สาขา');
            $objPHPExcel->getActiveSheet()->setCellValue('C3', $Branch);

            $objPHPExcel->getActiveSheet()->setCellValue('D5', 'ชื่อ-สกุล');
            $objPHPExcel->getActiveSheet()->setCellValue('E5', 'ตำแหน่ง');
            $objPHPExcel->getActiveSheet()->getStyle('D5')->getFont()->setBold(true);
            $objPHPExcel->getActiveSheet()->getStyle('E5')->getFont()->setBold(true);

            $row = 6;
            // Loop for details
            foreach ($AcademicBoard as $key => $value) {
                $objPHPExcel->getActiveSheet()->setCellValue('D' . $row, $value['nameThai'] . ' ' . $value['lastNameThai']);
                $objPHPExcel->getActiveSheet()->setCellValue('E' . $row, $value['positionThai']);
                $row++;
            }
            $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);

            $objPHPExcel->getActiveSheet()
            ->getStyle("D5:E" . $objPHPExcel->getActiveSheet()->getHighestRow())
            ->applyFromArray($this->getDefaultStyle());

            return $objPHPExcel;
        }

        private function generateSubcommittee($objPHPExcel, $condition){
            $subcommitteeID = $condition['Subcommittee'];

            // Get subcommittee by ID
            $Subcommittee = SubcommitteeService::getData($subcommitteeID);
            // print_r($Subcommittee);
            // exit;
            $objPHPExcel->getActiveSheet()->setCellValue('B2', 'คณะอนุกรรมการ : ' . $Subcommittee['subcommitteeName']);
            
            $objPHPExcel->getActiveSheet()->getStyle('B2')->getFont()->setBold(true);
            
            $objPHPExcel->getActiveSheet()->setCellValue('C5', 'ชื่อคณะกรรมการ');
            $objPHPExcel->getActiveSheet()->setCellValue('D5', 'ตำแหน่ง');
            $objPHPExcel->getActiveSheet()->getStyle('C5')->getFont()->setBold(true);
            $objPHPExcel->getActiveSheet()->getStyle('D5')->getFont()->setBold(true);
            $row = 6;
            foreach ($Subcommittee['subcommitteePerson'] as $key => $value) {
                $objPHPExcel->getActiveSheet()->setCellValue('C' . $row, $value['nameThai'] . ' ' . $value['lastNameThai']);
                $objPHPExcel->getActiveSheet()->setCellValue('D' . $row, $value['positionThai']);
                $row++;
            }

            $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
            $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);

            $objPHPExcel->getActiveSheet()
            ->getStyle("C5:D" . $objPHPExcel->getActiveSheet()->getHighestRow())
            ->applyFromArray($this->getDefaultStyle());

            return $objPHPExcel;

        }

        private function getDefaultStyle(){
            return array(                  
                    'allborders' => array(
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK
                    ),
                    'alignment' => array(
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_TOP,
                        'wrap' => true
                     ),
                     'font'  => array(
                        'size'  => 12,
                        // 'bold'  => true
                    )
                );
        }


    
    }