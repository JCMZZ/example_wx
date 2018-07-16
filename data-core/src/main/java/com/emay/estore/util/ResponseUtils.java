package com.emay.estore.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class ResponseUtils {

	public static void outputWithJson(HttpServletResponse response,Object obj){
		response.setContentType("text/plain;charset=utf-8");
		
		String json = JsonUtils.toJsonString(obj);
		
		OutputStream out = null;
		try {
			out = response.getOutputStream();
			out.write(json.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally{
			try {
				if (out != null)
					out.close();
			}catch(Exception e){
				throw new RuntimeException(e);
			}
		}
	}
	
	public static void outputWithJsonp(HttpServletResponse response,String json,String jsonp){
		response.setContentType("text/javascript;charset=utf-8");
		OutputStream out = null;
		try {
			json = jsonp + "(eval("+json+"))";
			out = response.getOutputStream();
			out.write(json.getBytes("UTF-8"));
			out.flush();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally{
			try {
				if (out != null){
					out.close();
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}
	
	public static void exportExcel(HttpServletResponse response,String[] titles ,List<String[]> contents){
		try {
			response.setContentType("application/vnd.ms-excel");  
	        response.setHeader("Content-disposition", "attachment;filename=books.xls");  
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet sheet = workbook.createSheet("操作日志");
			HSSFRow first = sheet.createRow(0);
			if(titles != null){
				for(int i = 0 ; i < titles.length ; i ++){
					first.createCell(i).setCellValue(titles[i]);
				}
			}
			if(contents != null){
				for(int i = 0 ; i < contents.size() ; i ++){
					HSSFRow row = sheet.createRow(i + 1);
					String[] con = contents.get(i);
					for(int j = 0 ; j < con.length ; j ++){
						row.createCell(j).setCellValue(con[j]);
					}
				}
			}
			workbook.write(response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();
		} catch (IOException e) {
			throw new RuntimeException("导出失败");
		}
	}
	
}
